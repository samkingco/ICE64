import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  ICE64,
  ICE64DataStore,
  ICE64Renderer,
  MockERC20,
  MockERC721,
  MockXQSTGFX,
} from "../typechain-types";
import { data } from "./tokenData";
import { chunks } from "./tokenStorageChunks";

const originalBaseURI = "ipfs://<CID>/";
const maxId = BigNumber.from(16);
const maxEditions = BigNumber.from(32);
const chunkSize = 2;

const tokenDataArr: string[] = [];
for (const [_, image] of Object.entries(data)) {
  tokenDataArr.push(image);
}

describe("ICE64 contracts", () => {
  let contract: ICE64;
  let dataStore: ICE64DataStore;
  let metadata: ICE64Renderer;
  let roots: MockERC721;
  let xqstgfx: MockXQSTGFX;
  let deployer: SignerWithAddress;
  let owner: SignerWithAddress;
  let royalties: SignerWithAddress;
  let buyerA: SignerWithAddress;
  let buyerB: SignerWithAddress;
  let rootsHolder: SignerWithAddress;
  let buyers: SignerWithAddress[] = [];

  beforeEach(async () => {
    [deployer, owner, royalties, buyerA, buyerB, rootsHolder, ...buyers] =
      await ethers.getSigners();

    const MockERC721Factory = await ethers.getContractFactory("MockERC721");
    roots = await MockERC721Factory.deploy();

    const ICE64Factory = await ethers.getContractFactory("ICE64");
    contract = await ICE64Factory.deploy(
      owner.address,
      royalties.address,
      roots.address
    );

    const ICE64DataStoreFactory = await ethers.getContractFactory(
      "ICE64DataStore"
    );
    dataStore = await ICE64DataStoreFactory.deploy(
      owner.address,
      originalBaseURI
    );

    const MockXQSTGFX = await ethers.getContractFactory("MockXQSTGFX");
    xqstgfx = await MockXQSTGFX.deploy();

    const ICE64RendererFactory = await ethers.getContractFactory(
      "ICE64Renderer"
    );
    metadata = await ICE64RendererFactory.deploy(
      contract.address,
      dataStore.address,
      xqstgfx.address
    );
  });

  describe("ICE64", () => {
    describe("owner", () => {
      it("should set the correct owner", async () => {
        expect(await contract.owner()).to.equal(owner.address);
      });
    });

    describe("metadata", () => {
      describe("setMetadata", () => {
        it("sets the correct metadata address", async () => {
          await contract.connect(owner).setMetadata(metadata.address);
          expect(await contract.metadata()).to.equal(metadata.address);
        });

        it("only lets the owner set the metadata address", async () => {
          await expect(
            contract.connect(buyerA).setMetadata(metadata.address)
          ).to.be.revertedWith("UNAUTHORIZED");
        });
      });
    });

    describe("purchasing", () => {
      beforeEach(async () => {
        const photoData = chunks.slice(0, 2);
        for (const [chunkIdx, tokenData] of photoData.entries()) {
          await dataStore
            .connect(owner)
            .storeChunkedEditionPhotoData(chunkIdx + 1, tokenData);
        }
        await contract.connect(owner).setMetadata(metadata.address);
      });

      describe("originals", () => {
        describe("purchaseOriginal", () => {
          it("allows purchasing of originals", async () => {
            const originalId = 1;
            const editionId = await contract.getEditionTokenId(originalId);
            const priceOriginal = await contract.priceOriginal();

            const startingBalance = await contract.balanceOfBatch(
              [buyerA.address, buyerA.address],
              [originalId, editionId]
            );

            expect(startingBalance).to.eql([
              BigNumber.from(0),
              BigNumber.from(0),
            ]);

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            const endingBalance = await contract.balanceOfBatch(
              [buyerA.address, buyerA.address],
              [originalId, editionId]
            );

            expect(endingBalance).to.eql([
              BigNumber.from(1),
              BigNumber.from(1),
            ]);
          });

          it("allows purchasing of an edition and then the original", async () => {
            const originalId = 1;
            const editionId = await contract.getEditionTokenId(originalId);
            const priceOriginal = await contract.priceOriginal();
            const priceEdition = await contract.priceEdition();

            const startingBalance = await contract.balanceOfBatch(
              [buyerA.address, buyerA.address],
              [originalId, editionId]
            );

            expect(startingBalance).to.eql([
              BigNumber.from(0),
              BigNumber.from(0),
            ]);

            await contract
              .connect(buyerA)
              .purchaseEdition(originalId, { value: priceEdition });

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            const endingBalance = await contract.balanceOfBatch(
              [buyerA.address, buyerA.address],
              [originalId, editionId]
            );

            expect(endingBalance).to.eql([
              BigNumber.from(1),
              BigNumber.from(1),
            ]);
          });

          it("prevents purchasing more than 1 original", async () => {
            const originalId = 1;
            const priceOriginal = await contract.priceOriginal();

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            await expect(
              contract
                .connect(buyerA)
                .purchaseOriginal(originalId, { value: priceOriginal })
            ).to.be.revertedWith("SoldOut()");

            await expect(
              contract
                .connect(buyerB)
                .purchaseOriginal(originalId, { value: priceOriginal })
            ).to.be.revertedWith("SoldOut()");
          });

          it("prevents purchasing an invalid original", async () => {
            const priceOriginal = await contract.priceOriginal();

            await expect(
              contract
                .connect(buyerB)
                .purchaseOriginal(0, { value: priceOriginal })
            ).to.be.revertedWith("InvalidToken()");

            await expect(
              contract
                .connect(buyerB)
                .purchaseOriginal(maxId.add(1), { value: priceOriginal })
            ).to.be.revertedWith("InvalidToken()");
          });

          it("prevents purchasing an original with the wrong price", async () => {
            const priceOriginal = await contract.priceOriginal();

            await expect(
              contract
                .connect(buyerB)
                .purchaseOriginal(1, { value: priceOriginal.add(10) })
            ).to.be.revertedWith("IncorrectEthAmount()");

            await expect(
              contract
                .connect(buyerB)
                .purchaseOriginal(1, { value: priceOriginal.sub(10) })
            ).to.be.revertedWith("IncorrectEthAmount()");
          });
        });

        describe("getOriginalTokenId", () => {
          it("gets the original token id for an edition", async () => {
            expect(await contract.getOriginalTokenId(101)).to.equal(1);
          });
        });

        describe("getOriginalSold", () => {
          it("checks if the original has been sold", async () => {
            const originalId = 1;
            const priceOriginal = await contract.priceOriginal();

            expect(await contract.getOriginalSold(originalId)).to.be.false;

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            expect(await contract.getOriginalSold(originalId)).to.be.true;
          });
        });
      });

      describe("editions", () => {
        describe("purchaseEdition", () => {
          it("allows purchasing of editions", async () => {
            const originalId = 1;
            const editionId = await contract.getEditionTokenId(originalId);
            const priceEdition = await contract.priceEdition();

            const startingBalance = await contract.balanceOf(
              buyerA.address,
              editionId
            );
            expect(startingBalance).to.eql(BigNumber.from(0));

            await contract
              .connect(buyerA)
              .purchaseEdition(originalId, { value: priceEdition });

            const endingBalance = await contract.balanceOf(
              buyerA.address,
              editionId
            );
            expect(endingBalance).to.eql(BigNumber.from(1));
          });

          it("prevents purchasing more than 1 edition per owner", async () => {
            const originalId = 1;
            const priceEdition = await contract.priceEdition();

            await contract
              .connect(buyerA)
              .purchaseEdition(originalId, { value: priceEdition });

            await expect(
              contract
                .connect(buyerA)
                .purchaseEdition(originalId, { value: priceEdition })
            ).to.be.revertedWith("AlreadyOwnerOfEdition()");
          });

          it("prevents purchasing an invalid edition", async () => {
            const priceEdition = await contract.priceEdition();

            await expect(
              contract
                .connect(buyerB)
                .purchaseEdition(0, { value: priceEdition })
            ).to.be.revertedWith("InvalidToken()");

            await expect(
              contract
                .connect(buyerB)
                .purchaseEdition(maxId.add(1), { value: priceEdition })
            ).to.be.revertedWith("InvalidToken()");
          });

          it("prevents purchasing an edition with the wrong price", async () => {
            const priceEdition = await contract.priceEdition();

            await expect(
              contract
                .connect(buyerB)
                .purchaseEdition(1, { value: priceEdition.add(10) })
            ).to.be.revertedWith("IncorrectEthAmount()");

            await expect(
              contract
                .connect(buyerB)
                .purchaseEdition(1, { value: priceEdition.sub(10) })
            ).to.be.revertedWith("IncorrectEthAmount()");
          });

          it("prevents exceeding max number of editions when original hasn't been purchased", async () => {
            const originalId = 1;
            const maxEditions = await contract.getMaxEditions();
            const priceOriginal = await contract.priceOriginal();
            const priceEdition = await contract.priceEdition();

            for (let i = 0; i < maxEditions.toNumber() - 1; i++) {
              await contract
                .connect(buyers[i])
                .purchaseEdition(originalId, { value: priceEdition });
            }

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions.sub(1)
            );

            await expect(
              contract
                .connect(buyerA)
                .purchaseEdition(originalId, { value: priceEdition })
            ).to.be.revertedWith("EditionForOriginalStillReserved()");

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions
            );
          });

          it("prevents exceeding max number of editions when original has been purchased", async () => {
            const originalId = 1;
            const maxEditions = await contract.getMaxEditions();
            const priceOriginal = await contract.priceOriginal();
            const priceEdition = await contract.priceEdition();

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            for (let i = 0; i < maxEditions.toNumber() - 1; i++) {
              await contract
                .connect(buyers[i])
                .purchaseEdition(originalId, { value: priceEdition });
            }

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions
            );

            await expect(
              contract
                .connect(buyerB)
                .purchaseEdition(originalId, { value: priceEdition })
            ).to.be.revertedWith("SoldOut()");
          });

          it("prevents exceeding max number of editions when eventual original buyer purchases an edition first", async () => {
            const originalId = 1;
            const maxEditions = await contract.getMaxEditions();
            const priceOriginal = await contract.priceOriginal();
            const priceEdition = await contract.priceEdition();

            await contract
              .connect(buyerA)
              .purchaseEdition(originalId, { value: priceEdition });

            for (let i = 0; i < maxEditions.toNumber() - 2; i++) {
              await contract
                .connect(buyers[i])
                .purchaseEdition(originalId, { value: priceEdition });
            }

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions.sub(1)
            );

            await expect(
              contract
                .connect(buyerB)
                .purchaseEdition(originalId, { value: priceEdition })
            ).to.be.revertedWith("EditionForOriginalStillReserved()");

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions.sub(1)
            );

            await contract
              .connect(buyerB)
              .purchaseEdition(originalId, { value: priceEdition });

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions
            );

            await expect(
              contract
                .connect(owner)
                .purchaseEdition(originalId, { value: priceEdition })
            ).to.be.revertedWith("SoldOut()");
          });
        });

        describe("getEditionTokenId", () => {
          it("gets the edition token id for an original", async () => {
            expect(await contract.getEditionTokenId(1)).to.equal(101);
          });
        });

        describe("getEditionsSold", () => {
          it("gets the number of editions sold for a given original", async () => {
            const originalId = 1;
            const priceOriginal = await contract.priceOriginal();

            expect(await contract.getEditionsSold(originalId)).to.equal(0);

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            expect(await contract.getEditionsSold(originalId)).to.equal(1);
          });
        });

        describe("getMaxEditions", () => {
          it("gets the max number of editions... ever", async () => {
            expect(await contract.getMaxEditions()).to.equal(maxEditions);
          });
        });

        describe("isEdition", () => {
          it("checks if a token is an edition or an original", async () => {
            expect(await contract.isEdition(1)).to.be.false;
            expect(await contract.isEdition(101)).to.be.true;
          });
        });
      });

      describe("roots claiming", () => {
        beforeEach(async () => {
          await roots.connect(rootsHolder).mint(1);
          await roots.connect(rootsHolder).mint(10);
          await roots.connect(rootsHolder).mint(20);
          await roots.connect(rootsHolder).mint(30);
          await roots.connect(rootsHolder).mint(40);
        });

        describe("claimEditionAsRootsHolder", () => {
          it("should allow roots holders to claim an edition", async () => {
            const originalId = 1;
            const editionId = await contract.getEditionTokenId(originalId);

            const startingBalance = await contract.balanceOf(
              rootsHolder.address,
              editionId
            );
            expect(startingBalance).to.eql(BigNumber.from(0));

            expect(await contract.hasEditionBeenClaimedForRootsPhoto(1)).to.be
              .false;

            await contract
              .connect(rootsHolder)
              .claimEditionAsRootsHolder(originalId, 1);

            const endingBalance = await contract.balanceOf(
              rootsHolder.address,
              editionId
            );
            expect(endingBalance).to.eql(BigNumber.from(1));

            expect(await contract.hasEditionBeenClaimedForRootsPhoto(1)).to.be
              .true;
          });

          it("should allow roots holders with multiple tokens to claim multiple editions", async () => {
            const startingBalance = await contract.balanceOfBatch(
              [rootsHolder.address, rootsHolder.address, rootsHolder.address],
              [101, 108, 116]
            );
            expect(startingBalance).to.eql([
              BigNumber.from(0),
              BigNumber.from(0),
              BigNumber.from(0),
            ]);

            expect(await contract.hasEditionBeenClaimedForRootsPhoto(10)).to.be
              .false;
            expect(await contract.hasEditionBeenClaimedForRootsPhoto(20)).to.be
              .false;
            expect(await contract.hasEditionBeenClaimedForRootsPhoto(30)).to.be
              .false;
            expect(await contract.hasEditionBeenClaimedForRootsPhoto(40)).to.be
              .false;

            await contract
              .connect(rootsHolder)
              .claimEditionAsRootsHolder(1, 10);
            await contract
              .connect(rootsHolder)
              .claimEditionAsRootsHolder(8, 20);
            await contract
              .connect(rootsHolder)
              .claimEditionAsRootsHolder(16, 30);

            const endingBalance = await contract.balanceOfBatch(
              [rootsHolder.address, rootsHolder.address, rootsHolder.address],
              [101, 108, 116]
            );
            expect(endingBalance).to.eql([
              BigNumber.from(1),
              BigNumber.from(1),
              BigNumber.from(1),
            ]);

            expect(await contract.hasEditionBeenClaimedForRootsPhoto(10)).to.be
              .true;
            expect(await contract.hasEditionBeenClaimedForRootsPhoto(20)).to.be
              .true;
            expect(await contract.hasEditionBeenClaimedForRootsPhoto(30)).to.be
              .true;
            expect(await contract.hasEditionBeenClaimedForRootsPhoto(40)).to.be
              .false;
          });

          it("prevents double claiming for roots holders", async () => {
            const rootsId = 1;
            await contract
              .connect(rootsHolder)
              .claimEditionAsRootsHolder(1, rootsId);
            await expect(
              contract
                .connect(rootsHolder)
                .claimEditionAsRootsHolder(2, rootsId)
            ).to.be.revertedWith("RootsPhotoAlreadyUsedClaim()");
          });

          it("prevents claiming for already used tokens", async () => {
            const rootsId = 1;
            await contract
              .connect(rootsHolder)
              .claimEditionAsRootsHolder(1, rootsId);
            await roots
              .connect(rootsHolder)
              .transferFrom(rootsHolder.address, buyerA.address, rootsId);
            await expect(
              contract.connect(buyerA).claimEditionAsRootsHolder(1, rootsId)
            ).to.be.revertedWith("RootsPhotoAlreadyUsedClaim()");
          });

          it("prevents claiming when a roots holder already owns the edition being claimed", async () => {
            const originalId = 1;
            const editionPrice = await contract.priceEdition();

            await contract
              .connect(rootsHolder)
              .purchaseEdition(originalId, { value: editionPrice });

            await expect(
              contract
                .connect(rootsHolder)
                .claimEditionAsRootsHolder(originalId, 1)
            ).to.be.revertedWith("AlreadyOwnerOfEdition()");
          });

          it("only claims while there's availability", async () => {
            const originalId = 1;
            const maxEditions = await contract.getMaxEditions();
            const priceOriginal = await contract.priceOriginal();
            const priceEdition = await contract.priceEdition();

            await contract
              .connect(buyerA)
              .purchaseOriginal(originalId, { value: priceOriginal });

            for (let i = 0; i < maxEditions.toNumber() - 1; i++) {
              await contract
                .connect(buyers[i])
                .purchaseEdition(originalId, { value: priceEdition });
            }

            expect(await contract.getEditionsSold(originalId)).to.eql(
              maxEditions
            );

            await expect(
              contract
                .connect(rootsHolder)
                .claimEditionAsRootsHolder(originalId, 1)
            ).to.be.revertedWith("SoldOut()");
          });
        });
      });
    });

    describe("ERC-1155", () => {
      describe("burn", () => {
        it("should burn tokens", async () => {
          const originalId = 1;
          const priceOriginal = await contract.priceOriginal();

          expect(await contract.balanceOf(buyerA.address, originalId)).to.eql(
            BigNumber.from(0)
          );

          await contract
            .connect(buyerA)
            .purchaseOriginal(originalId, { value: priceOriginal });

          expect(await contract.balanceOf(buyerA.address, originalId)).to.eql(
            BigNumber.from(1)
          );

          await expect(contract.connect(buyerA).burn(1))
            .to.emit(contract, "TransferSingle")
            .withArgs(
              buyerA.address,
              buyerA.address,
              ethers.constants.AddressZero,
              originalId,
              1
            );

          expect(await contract.balanceOf(buyerA.address, originalId)).to.eql(
            BigNumber.from(0)
          );
        });
      });

      describe("uri", () => {
        it("should correctly render originals metadata", async () => {
          await contract.connect(owner).setMetadata(metadata.address);
          expect(await contract.uri(1)).to.equal(`${originalBaseURI}1`);
        });

        it("should revert if the metadata address isn't set yet", async () => {
          await expect(contract.uri(1)).to.be.revertedWith("NoMetadataYet()");
        });
      });
    });

    describe("withdrawing", () => {
      describe("withdrawBalance", () => {
        it("should withdraw the contract balance to the owner", async () => {
          const priceOriginal = await contract.priceOriginal();
          const startingBalance = await ethers.provider.getBalance(
            owner.address
          );
          await contract
            .connect(buyerA)
            .purchaseOriginal(1, { value: priceOriginal });
          await contract.withdrawBalance();
          const endingBalance = await ethers.provider.getBalance(owner.address);
          expect(endingBalance.sub(startingBalance)).to.equal(priceOriginal);
        });
      });

      describe("withdrawToken", () => {
        let erc20: MockERC20;

        beforeEach(async () => {
          const MockERC20Factory = await ethers.getContractFactory("MockERC20");
          erc20 = await MockERC20Factory.deploy();
          await erc20.connect(buyerA).mint(200);
        });

        it("should withdraw the contract balance to the owner", async () => {
          const startingBalance = await erc20.balanceOf(owner.address);
          await erc20.connect(buyerA).transfer(contract.address, 200);
          await contract.withdrawToken(erc20.address);
          const endingBalance = await erc20.balanceOf(owner.address);
          expect(endingBalance.sub(startingBalance)).to.equal(200);
        });
      });
    });

    describe("royalties", () => {
      it("uses default royalties when deployed", async () => {
        expect(await contract.royaltyInfo(1, 200_000)).to.eql([
          royalties.address,
          BigNumber.from(200_000 * 0.064),
        ]);
      });

      it("correctly updates royalty info", async () => {
        await contract.connect(owner).setRoyaltyInfo(buyerA.address, 1000);
        expect(await contract.royaltyInfo(1, 200_000)).to.eql([
          buyerA.address,
          BigNumber.from(200_000 * 0.1),
        ]);
      });

      it("supports the EIP-2981 interface", async () => {
        const selector = "0x2a55205a"; // => bytes4(keccak256("royaltyInfo(uint256,uint256)"))
        expect(await contract.supportsInterface(selector)).to.be.true;
      });
    });
  });

  describe("ICE64DataStore", () => {
    describe("owner", () => {
      it("should set the correct owner", async () => {
        expect(await contract.owner()).to.equal(owner.address);
        expect(await dataStore.owner()).to.equal(owner.address);
      });
    });

    describe("setOriginalsBaseURI", () => {
      it("sets the correct baseURI for originals", async () => {
        await dataStore.connect(owner).setOriginalsBaseURI("ar://<CID>");
        expect(await dataStore.getBaseURI()).to.equal("ar://<CID>");
      });

      it("only lets the owner set the baseURI for originals", async () => {
        await expect(
          dataStore.connect(buyerA).setOriginalsBaseURI("ar://<CID>")
        ).to.be.revertedWith("UNAUTHORIZED");
      });
    });

    describe("storeChunkedEditionPhotoData", () => {
      it("can store edition photo data", async () => {
        const numTestChunks = 2;
        const photoData = chunks.slice(0, numTestChunks);

        for (const [chunkIdx, tokenData] of photoData.entries()) {
          await dataStore
            .connect(owner)
            .storeChunkedEditionPhotoData(chunkIdx + 1, tokenData);
        }

        for (const [index, image] of tokenDataArr
          .slice(0, chunkSize * numTestChunks)
          .entries()) {
          expect(await dataStore.getRawPhotoData(index + 1)).to.equal(image);
        }
      });

      it("only lets the owner store edition photo data", async () => {
        await expect(
          dataStore.connect(buyerA).storeChunkedEditionPhotoData(1, chunks[0])
        ).to.be.revertedWith("UNAUTHORIZED");
      });
    });
  });

  describe.skip("ICE64Renderer", () => {
    beforeEach(async () => {
      await contract.connect(owner).setMetadata(metadata.address);

      const numTestChunks = 2;
      const photoData = chunks.slice(0, numTestChunks);
      for (const [chunkIdx, tokenData] of photoData.entries()) {
        await dataStore
          .connect(owner)
          .storeChunkedEditionPhotoData(chunkIdx + 1, tokenData);
      }
    });

    // TODO: Test this properly
    it("should render tokens uris", async () => {
      const uri = await metadata.tokenURI(102);
      console.log(uri);
      expect(true).to.be.true;
    });
  });
});
