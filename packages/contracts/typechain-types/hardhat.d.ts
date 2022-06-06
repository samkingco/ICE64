/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "SSTORE2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SSTORE2__factory>;
    getContractFactory(
      name: "Bytecode",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bytecode__factory>;
    getContractFactory(
      name: "IGraphics",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGraphics__factory>;
    getContractFactory(
      name: "XQSTGFX",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.XQSTGFX__factory>;
    getContractFactory(
      name: "XQSTValidate",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.XQSTValidate__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC721__factory>;
    getContractFactory(
      name: "IERC165",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165__factory>;
    getContractFactory(
      name: "Owned",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Owned__factory>;
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "ERC1155TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TokenReceiver__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;
    getContractFactory(
      name: "ICE64",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICE64__factory>;
    getContractFactory(
      name: "ICE64Renderer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ICE64Renderer__factory>;
    getContractFactory(
      name: "IICE64",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IICE64__factory>;
    getContractFactory(
      name: "IICE64Renderer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IICE64Renderer__factory>;
    getContractFactory(
      name: "MockERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockERC20__factory>;
    getContractFactory(
      name: "MockERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockERC721__factory>;
    getContractFactory(
      name: "MockXQSTGFX",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockXQSTGFX__factory>;

    getContractAt(
      name: "SSTORE2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SSTORE2>;
    getContractAt(
      name: "Bytecode",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Bytecode>;
    getContractAt(
      name: "IGraphics",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IGraphics>;
    getContractAt(
      name: "XQSTGFX",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.XQSTGFX>;
    getContractAt(
      name: "XQSTValidate",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.XQSTValidate>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC721>;
    getContractAt(
      name: "IERC165",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165>;
    getContractAt(
      name: "Owned",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Owned>;
    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "ERC1155TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TokenReceiver>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;
    getContractAt(
      name: "ICE64",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICE64>;
    getContractAt(
      name: "ICE64Renderer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ICE64Renderer>;
    getContractAt(
      name: "IICE64",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IICE64>;
    getContractAt(
      name: "IICE64Renderer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IICE64Renderer>;
    getContractAt(
      name: "MockERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockERC20>;
    getContractAt(
      name: "MockERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockERC721>;
    getContractAt(
      name: "MockXQSTGFX",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockXQSTGFX>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
