import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  ICE64,
  ICE64Emerges,
  RootsClaim,
  SetMetadataAddress,
  TransferBatch,
  TransferSingle,
} from "../generated/ICE64/ICE64";
import { Roots, Transfer as RootsTransfer } from "../generated/Roots/Roots";
import {
  EditionPhoto,
  OriginalPhoto,
  RootsPhoto,
  Settings,
  Transfer,
  Wallet,
} from "../generated/schema";

const zeroAddress = "0x0000000000000000000000000000000000000000";

export function handleInit(event: ICE64Emerges): void {
  const contract = ICE64.bind(event.address);

  let settings = Settings.load("ICE64:settings");
  if (!settings) {
    settings = new Settings("ICE64:settings");
    settings.priceOriginal = contract.priceOriginal();
    settings.priceEdition = contract.priceEdition();
    settings.maxEditions = contract.getMaxEditions();
  }
  settings.save();
}

export function handleSetMetadata(event: SetMetadataAddress): void {
  const contract = ICE64.bind(event.address);
  const maxTokenId = 16;

  if (event.params.metadata) {
    for (let i = 0; i < maxTokenId; i++) {
      const id = BigInt.fromI32(i + 1);
      const editionId = contract.getEditionTokenId(id);

      let original = OriginalPhoto.load(id.toString());
      let edition = EditionPhoto.load(editionId.toString());

      if (!original) {
        original = new OriginalPhoto(id.toString());
        original.editionId = editionId;
      }

      if (!edition) {
        edition = new EditionPhoto(editionId.toString());
        edition.originalId = id;
        edition.totalPurchased = BigInt.fromI32(0);
        edition.maxEditions = contract.getMaxEditions();
      }

      const originalUri = contract.try_uri(id);
      if (originalUri.reverted) {
        log.info("URI reverted", [id.toString()]);
      } else {
        original.uri = originalUri.value;
      }

      const editionUri = contract.try_uri(id);
      if (editionUri.reverted) {
        log.info("URI reverted", [id.toString()]);
      } else {
        edition.uri = editionUri.value;
      }

      original.save();
      edition.save();
    }
  }
}

function resolveTransferType(status: i32): string {
  switch (status) {
    case 1:
      return "Purchase";
    case 2:
      return "RootsClaim";
    case 3:
      return "Burn";
    default:
      return "Transfer";
  }
}

export function handleTransfer(event: TransferSingle): void {
  const contract = ICE64.bind(event.address);

  const id = event.params.id;
  const fromAddress = event.params.from;
  const toAddress = event.params.to;

  let isEdition = id.gt(BigInt.fromI32(100));
  let isMint = fromAddress.toHexString() == zeroAddress;
  let isBurn = toAddress.toHexString() == zeroAddress;

  let fromWallet = Wallet.load(fromAddress.toHexString());
  if (!fromWallet) {
    fromWallet = new Wallet(fromAddress.toHexString());
    fromWallet.address = fromAddress;
    fromWallet.originalsCount = BigInt.fromI32(0);
    fromWallet.editionsCount = BigInt.fromI32(0);
  }
  if (!isMint) {
    if (isEdition) {
      fromWallet.editionsCount = fromWallet.editionsCount.minus(
        BigInt.fromI32(1)
      );
    } else {
      fromWallet.originalsCount = fromWallet.originalsCount.minus(
        BigInt.fromI32(1)
      );
    }
  }
  fromWallet.save();

  let toWallet = Wallet.load(toAddress.toHexString());
  if (!toWallet) {
    toWallet = new Wallet(toAddress.toHexString());
    toWallet.address = toAddress;
    toWallet.originalsCount = BigInt.fromI32(0);
    toWallet.editionsCount = BigInt.fromI32(0);
  }
  if (!isBurn) {
    if (isEdition) {
      toWallet.editionsCount = toWallet.editionsCount.plus(BigInt.fromI32(1));
    } else {
      toWallet.originalsCount = toWallet.originalsCount.plus(BigInt.fromI32(1));
    }
  }
  toWallet.save();

  let transfer = Transfer.load(event.transaction.hash.toHex());
  if (!transfer) {
    transfer = new Transfer(event.transaction.hash.toHex());
    transfer.tokenId = id;
    transfer.from = fromWallet.id;
    transfer.to = toWallet.id;
    transfer.txHash = event.transaction.hash;
    transfer.timestamp = event.block.timestamp;
    if (!transfer.txType) {
      if (isMint) {
        transfer.txType = resolveTransferType(1);
      } else if (isBurn) {
        transfer.txType = resolveTransferType(3);
      } else {
        transfer.txType = resolveTransferType(0);
      }
    }
    transfer.save();
  }

  if (isEdition) {
    let edition = EditionPhoto.load(id.toString());
    if (edition) {
      const currentOwnerIndex = edition.currentOwners.indexOf(
        fromAddress.toHexString()
      );
      if (currentOwnerIndex > -1) {
        const before = edition.currentOwners.slice(0, currentOwnerIndex);
        const after = edition.currentOwners.slice(currentOwnerIndex + 1);
        const newOwners = [before, after].flat();
        newOwners.push(toWallet.id);
        edition.currentOwners = newOwners;
      }
      if (isMint) {
        edition.totalPurchased = edition.totalPurchased.plus(BigInt.fromI32(1));
      }
    } else {
      edition = new EditionPhoto(id.toString());
      edition.originalId = contract.getOriginalTokenId(id);
      edition.maxEditions = contract.getMaxEditions();
      edition.totalPurchased = BigInt.fromI32(1);

      const uri = contract.try_uri(id);
      if (uri.reverted) {
        log.info("URI reverted", [id.toString()]);
      } else {
        edition.uri = uri.value;
      }
    }

    if (isMint) {
      const purchasedBy = edition.purchasedBy;
      purchasedBy.push(toWallet.id);
      edition.purchasedBy = purchasedBy;

      const currentOwners = edition.currentOwners;
      currentOwners.push(toWallet.id);
      edition.currentOwners = currentOwners;
    }

    edition.save();
  } else {
    let original = OriginalPhoto.load(id.toString());
    if (original) {
      // If the original already exists, update the current owner
      original.currentOwner = toWallet.id;
    } else {
      // Else create a new original entity
      original = new OriginalPhoto(id.toString());
      original.editionId = contract.getEditionTokenId(id);
      original.purchasedBy = toWallet.id;
      original.purchasedAt = event.block.timestamp;
      original.currentOwner = toWallet.id;

      const uri = contract.try_uri(id);
      if (uri.reverted) {
        log.info("URI reverted", [id.toString()]);
      } else {
        original.uri = uri.value;
      }
    }
    original.save();
  }
}

export function handleTransferBatch(event: TransferBatch): void {}

export function handleRootsClaim(event: RootsClaim): void {
  const rootsId = event.params.rootsId;
  let rootsPhoto = RootsPhoto.load(rootsId.toString());
  // rootsPhoto _should_ be loaded since it has to be minted before claiming
  if (!rootsPhoto) {
    rootsPhoto = new RootsPhoto(rootsId.toString());
  }
  rootsPhoto.hasClaimedEdition = true;
  rootsPhoto.save();

  let transfer = Transfer.load(event.transaction.hash.toHex());
  if (transfer) {
    transfer.txType = resolveTransferType(2);
    transfer.rootsId = rootsId;
    transfer.save();
  }
}

export function handleRootsTransfer(event: RootsTransfer): void {
  const id = event.params.id;
  const fromAddress = event.params.from;
  const toAddress = event.params.to;
  const contract = Roots.bind(event.address);

  let fromWallet = Wallet.load(fromAddress.toHexString());
  if (!fromWallet) {
    fromWallet = new Wallet(fromAddress.toHexString());
    fromWallet.address = fromAddress;
    fromWallet.save();
  }

  let toWallet = Wallet.load(toAddress.toHexString());
  if (!toWallet) {
    toWallet = new Wallet(toAddress.toHexString());
    toWallet.address = toAddress;
    toWallet.save();
  }

  let rootsPhoto = RootsPhoto.load(id.toString());
  if (!rootsPhoto) {
    rootsPhoto = new RootsPhoto(id.toString());
    rootsPhoto.tokenURI = contract.tokenURI(id);
    rootsPhoto.hasClaimedEdition = false;
  }

  rootsPhoto.currentOwner = toWallet.id;
  rootsPhoto.save();
}
