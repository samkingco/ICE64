/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ICE64Interface extends utils.Interface {
  functions: {
    "balanceOf(address,uint256)": FunctionFragment;
    "balanceOfBatch(address[],uint256[])": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "claimEditionAsRootsHolder(uint256,uint256)": FunctionFragment;
    "getEditionTokenId(uint256)": FunctionFragment;
    "getEditionsSold(uint256)": FunctionFragment;
    "getMaxEditions()": FunctionFragment;
    "getOriginalSold(uint256)": FunctionFragment;
    "getOriginalTokenId(uint256)": FunctionFragment;
    "hasEditionBeenClaimedForRootsPhoto(uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "isEdition(uint256)": FunctionFragment;
    "metadata()": FunctionFragment;
    "owner()": FunctionFragment;
    "priceEdition()": FunctionFragment;
    "priceOriginal()": FunctionFragment;
    "purchaseEdition(uint256)": FunctionFragment;
    "purchaseOriginal(uint256)": FunctionFragment;
    "roots()": FunctionFragment;
    "royaltyInfo(uint256,uint256)": FunctionFragment;
    "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "safeTransferFrom(address,address,uint256,uint256,bytes)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "setMetadata(address)": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "setRoyaltyInfo(address,uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "uri(uint256)": FunctionFragment;
    "withdrawBalance()": FunctionFragment;
    "withdrawToken(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOfBatch",
    values: [string[], BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "claimEditionAsRootsHolder",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getEditionTokenId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getEditionsSold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getMaxEditions",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOriginalSold",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOriginalTokenId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "hasEditionBeenClaimedForRootsPhoto",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "isEdition",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "metadata", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "priceEdition",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceOriginal",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseEdition",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseOriginal",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "roots", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "royaltyInfo",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeBatchTransferFrom",
    values: [string, string, BigNumberish[], BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(functionFragment: "setMetadata", values: [string]): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setRoyaltyInfo",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "withdrawBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "balanceOfBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimEditionAsRootsHolder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEditionTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEditionsSold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMaxEditions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOriginalSold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOriginalTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasEditionBeenClaimedForRootsPhoto",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isEdition", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "metadata", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "priceEdition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceOriginal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseEdition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseOriginal",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "roots", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "royaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeBatchTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRoyaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "ApprovalForAll(address,address,bool)": EventFragment;
    "ICE64Emerges()": EventFragment;
    "OwnerUpdated(address,address)": EventFragment;
    "TransferBatch(address,address,address,uint256[],uint256[])": EventFragment;
    "TransferSingle(address,address,address,uint256,uint256)": EventFragment;
    "URI(string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ICE64Emerges"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferBatch"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferSingle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "URI"): EventFragment;
}

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { owner: string; operator: string; approved: boolean }
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export type ICE64EmergesEvent = TypedEvent<[], {}>;

export type ICE64EmergesEventFilter = TypedEventFilter<ICE64EmergesEvent>;

export type OwnerUpdatedEvent = TypedEvent<
  [string, string],
  { user: string; newOwner: string }
>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export type TransferBatchEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[]],
  {
    operator: string;
    from: string;
    to: string;
    ids: BigNumber[];
    amounts: BigNumber[];
  }
>;

export type TransferBatchEventFilter = TypedEventFilter<TransferBatchEvent>;

export type TransferSingleEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  {
    operator: string;
    from: string;
    to: string;
    id: BigNumber;
    amount: BigNumber;
  }
>;

export type TransferSingleEventFilter = TypedEventFilter<TransferSingleEvent>;

export type URIEvent = TypedEvent<
  [string, BigNumber],
  { value: string; id: BigNumber }
>;

export type URIEventFilter = TypedEventFilter<URIEvent>;

export interface ICE64 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICE64Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    balanceOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    balanceOfBatch(
      owners: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { balances: BigNumber[] }>;

    burn(
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    claimEditionAsRootsHolder(
      id: BigNumberish,
      rootsId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getEditionTokenId(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getEditionsSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getMaxEditions(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOriginalSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getOriginalTokenId(
      editionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    hasEditionBeenClaimedForRootsPhoto(
      rootsId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isEdition(id: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    metadata(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    priceEdition(overrides?: CallOverrides): Promise<[BigNumber]>;

    priceOriginal(overrides?: CallOverrides): Promise<[BigNumber]>;

    purchaseEdition(
      id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    purchaseOriginal(
      id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    roots(overrides?: CallOverrides): Promise<[string]>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
    >;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setMetadata(
      metadataAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRoyaltyInfo(
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    uri(id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    withdrawBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  balanceOf(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  balanceOfBatch(
    owners: string[],
    ids: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  burn(
    id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  claimEditionAsRootsHolder(
    id: BigNumberish,
    rootsId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getEditionTokenId(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getEditionsSold(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getMaxEditions(overrides?: CallOverrides): Promise<BigNumber>;

  getOriginalSold(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getOriginalTokenId(
    editionId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  hasEditionBeenClaimedForRootsPhoto(
    rootsId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isApprovedForAll(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isEdition(id: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  metadata(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  priceEdition(overrides?: CallOverrides): Promise<BigNumber>;

  priceOriginal(overrides?: CallOverrides): Promise<BigNumber>;

  purchaseEdition(
    id: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  purchaseOriginal(
    id: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  roots(overrides?: CallOverrides): Promise<string>;

  royaltyInfo(
    arg0: BigNumberish,
    salePrice: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
  >;

  safeBatchTransferFrom(
    from: string,
    to: string,
    ids: BigNumberish[],
    amounts: BigNumberish[],
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    amount: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setMetadata(
    metadataAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setOwner(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRoyaltyInfo(
    receiver: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  uri(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  withdrawBalance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    tokenAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    balanceOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      owners: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    burn(id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    claimEditionAsRootsHolder(
      id: BigNumberish,
      rootsId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getEditionTokenId(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEditionsSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxEditions(overrides?: CallOverrides): Promise<BigNumber>;

    getOriginalSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getOriginalTokenId(
      editionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasEditionBeenClaimedForRootsPhoto(
      rootsId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isEdition(id: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    metadata(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    priceEdition(overrides?: CallOverrides): Promise<BigNumber>;

    priceOriginal(overrides?: CallOverrides): Promise<BigNumber>;

    purchaseEdition(id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    purchaseOriginal(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    roots(overrides?: CallOverrides): Promise<string>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
    >;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setMetadata(metadataAddr: string, overrides?: CallOverrides): Promise<void>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    setRoyaltyInfo(
      receiver: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    uri(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    withdrawBalance(overrides?: CallOverrides): Promise<void>;

    withdrawToken(
      tokenAddress: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "ICE64Emerges()"(): ICE64EmergesEventFilter;
    ICE64Emerges(): ICE64EmergesEventFilter;

    "OwnerUpdated(address,address)"(
      user?: string | null,
      newOwner?: string | null
    ): OwnerUpdatedEventFilter;
    OwnerUpdated(
      user?: string | null,
      newOwner?: string | null
    ): OwnerUpdatedEventFilter;

    "TransferBatch(address,address,address,uint256[],uint256[])"(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      ids?: null,
      amounts?: null
    ): TransferBatchEventFilter;
    TransferBatch(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      ids?: null,
      amounts?: null
    ): TransferBatchEventFilter;

    "TransferSingle(address,address,address,uint256,uint256)"(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      id?: null,
      amount?: null
    ): TransferSingleEventFilter;
    TransferSingle(
      operator?: string | null,
      from?: string | null,
      to?: string | null,
      id?: null,
      amount?: null
    ): TransferSingleEventFilter;

    "URI(string,uint256)"(
      value?: null,
      id?: BigNumberish | null
    ): URIEventFilter;
    URI(value?: null, id?: BigNumberish | null): URIEventFilter;
  };

  estimateGas: {
    balanceOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    balanceOfBatch(
      owners: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burn(
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    claimEditionAsRootsHolder(
      id: BigNumberish,
      rootsId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getEditionTokenId(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getEditionsSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMaxEditions(overrides?: CallOverrides): Promise<BigNumber>;

    getOriginalSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOriginalTokenId(
      editionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    hasEditionBeenClaimedForRootsPhoto(
      rootsId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isEdition(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    metadata(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    priceEdition(overrides?: CallOverrides): Promise<BigNumber>;

    priceOriginal(overrides?: CallOverrides): Promise<BigNumber>;

    purchaseEdition(
      id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    purchaseOriginal(
      id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    roots(overrides?: CallOverrides): Promise<BigNumber>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setMetadata(
      metadataAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRoyaltyInfo(
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uri(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    withdrawBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    balanceOf(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    balanceOfBatch(
      owners: string[],
      ids: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    claimEditionAsRootsHolder(
      id: BigNumberish,
      rootsId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getEditionTokenId(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getEditionsSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMaxEditions(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOriginalSold(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOriginalTokenId(
      editionId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    hasEditionBeenClaimedForRootsPhoto(
      rootsId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isEdition(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    metadata(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceEdition(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    priceOriginal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchaseEdition(
      id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    purchaseOriginal(
      id: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    roots(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    royaltyInfo(
      arg0: BigNumberish,
      salePrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: BigNumberish[],
      amounts: BigNumberish[],
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    safeTransferFrom(
      from: string,
      to: string,
      id: BigNumberish,
      amount: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setMetadata(
      metadataAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRoyaltyInfo(
      receiver: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    uri(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdrawBalance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      tokenAddress: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
