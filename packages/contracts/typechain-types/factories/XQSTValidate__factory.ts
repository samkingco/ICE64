/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { XQSTValidate, XQSTValidateInterface } from "../XQSTValidate";

const _abi = [
  {
    inputs: [],
    name: "MAX_COLORS",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_COLS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_PIXELS",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_ROWS",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60cc610039600b82828239805160001a60731461002c57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060515760003560e01c8063581581a01460565780637eccd594146074578063e67953ea146056578063fd7982ca14608e575b600080fd5b605d60ff81565b60405160ff90911681526020015b60405180910390f35b607c61010081565b60405161ffff9091168152602001606b565b607c6127108156fea2646970667358221220940d9edbe2d9d3a9618bf1f91376eb84f78b4a026af29469b5ef4f0ad5f6e59564736f6c634300080e0033";

type XQSTValidateConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XQSTValidateConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XQSTValidate__factory extends ContractFactory {
  constructor(...args: XQSTValidateConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<XQSTValidate> {
    return super.deploy(overrides || {}) as Promise<XQSTValidate>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): XQSTValidate {
    return super.attach(address) as XQSTValidate;
  }
  connect(signer: Signer): XQSTValidate__factory {
    return super.connect(signer) as XQSTValidate__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XQSTValidateInterface {
    return new utils.Interface(_abi) as XQSTValidateInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XQSTValidate {
    return new Contract(address, _abi, signerOrProvider) as XQSTValidate;
  }
}
