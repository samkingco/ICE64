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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ICE64RendererInterface extends utils.Interface {
  functions: {
    "drawSVGToBytes(bytes)": FunctionFragment;
    "drawSVGToString(bytes)": FunctionFragment;
    "ice64()": FunctionFragment;
    "owner()": FunctionFragment;
    "setOwner(address)": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "xqstgfx()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "drawSVGToBytes",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "drawSVGToString",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "ice64", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "setOwner", values: [string]): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "xqstgfx", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "drawSVGToBytes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "drawSVGToString",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ice64", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "xqstgfx", data: BytesLike): Result;

  events: {
    "OwnerUpdated(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnerUpdated"): EventFragment;
}

export type OwnerUpdatedEvent = TypedEvent<
  [string, string],
  { user: string; newOwner: string }
>;

export type OwnerUpdatedEventFilter = TypedEventFilter<OwnerUpdatedEvent>;

export interface ICE64Renderer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICE64RendererInterface;

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
    drawSVGToBytes(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    drawSVGToString(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string]>;

    ice64(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokenURI(id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    xqstgfx(overrides?: CallOverrides): Promise<[string]>;
  };

  drawSVGToBytes(data: BytesLike, overrides?: CallOverrides): Promise<string>;

  drawSVGToString(data: BytesLike, overrides?: CallOverrides): Promise<string>;

  ice64(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  setOwner(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokenURI(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  xqstgfx(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    drawSVGToBytes(data: BytesLike, overrides?: CallOverrides): Promise<string>;

    drawSVGToString(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    ice64(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    setOwner(newOwner: string, overrides?: CallOverrides): Promise<void>;

    tokenURI(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    xqstgfx(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "OwnerUpdated(address,address)"(
      user?: string | null,
      newOwner?: string | null
    ): OwnerUpdatedEventFilter;
    OwnerUpdated(
      user?: string | null,
      newOwner?: string | null
    ): OwnerUpdatedEventFilter;
  };

  estimateGas: {
    drawSVGToBytes(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    drawSVGToString(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ice64(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokenURI(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    xqstgfx(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    drawSVGToBytes(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    drawSVGToString(
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ice64(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setOwner(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokenURI(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    xqstgfx(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
