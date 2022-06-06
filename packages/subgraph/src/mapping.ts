import { BigInt, log } from "@graphprotocol/graph-ts";
import { ICE64, TransferBatch, TransferSingle } from "../generated/ICE64/ICE64";
import {
  EditionPhoto,
  OriginalPhoto,
  Settings,
  Wallet,
} from "../generated/schema";

export function handleTransfer(event: TransferSingle): void {
  const contract = ICE64.bind(event.address);

  let settings = Settings.load(event.address.toString());
  if (!settings) {
    settings = new Settings(event.address.toString());
    settings.priceOriginal = contract.priceOriginal();
    settings.priceEdition = contract.priceEdition();
    settings.maxEditions = contract.getMaxEditions();
  }

  const id = event.params.id;
  const fromAddress = event.params.from;
  const toAddress = event.params.to;

  let isEdition = id.gt(BigInt.fromI32(100));
  let isMint =
    fromAddress.toHexString() == "0x0000000000000000000000000000000000000000";
  let isBurn =
    toAddress.toHexString() == "0x0000000000000000000000000000000000000000";

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
        newOwners.push(fromWallet.id);
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
