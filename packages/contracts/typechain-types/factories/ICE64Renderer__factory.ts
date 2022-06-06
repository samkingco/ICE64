/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ICE64Renderer, ICE64RendererInterface } from "../ICE64Renderer";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "ice64_",
        type: "address",
      },
      {
        internalType: "address",
        name: "xqstgfx_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "drawSVGToBytes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "drawSVGToString",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ice64",
    outputs: [
      {
        internalType: "contract IICE64",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "xqstgfx",
    outputs: [
      {
        internalType: "contract XQSTGFX",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161117138038061117183398101604081905261002f916100c6565b600080546001600160a01b0319166001600160a01b03851690811782556040518592907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76908290a350600180546001600160a01b039384166001600160a01b0319918216179091556002805492909316911617905550610109565b80516001600160a01b03811681146100c157600080fd5b919050565b6000806000606084860312156100db57600080fd5b6100e4846100aa565b92506100f2602085016100aa565b9150610100604085016100aa565b90509250925092565b611059806101186000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100e7578063b1bdd9dc146100fa578063c87b56dd1461010d578063e88741691461012057600080fd5b806313af40351461008257806340a0a3b014610097578063603f14da146100c7575b600080fd5b61009561009036600461099a565b610133565b005b6001546100aa906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100da6100d5366004610a32565b6101cc565b6040516100be9190610b0a565b6000546100aa906001600160a01b031681565b6100da610108366004610a32565b6101dd565b6100da61011b366004610b1d565b6102ab565b6002546100aa906001600160a01b031681565b6000546001600160a01b031633146101815760405162461bcd60e51b815260206004820152600c60248201526b15539055551213d49256915160a21b60448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b0383169081178255604051909133917f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d769190a350565b60606101d7826101dd565b92915050565b6002546040516320b345dd60e01b81526060916000916001600160a01b03909116906320b345dd90610213908690600401610b0a565b600060405180830381865afa158015610230573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102589190810190610b66565b6040805162080060810190915262080040815260006020909101818152919250506102a48260405160200161028d9190610bcb565b60408051601f198184030181529190528290610666565b9392505050565b600154604051631a76aedf60e21b8152600481018390526060916001600160a01b0316906369dabb7c90602401602060405180830381865afa1580156102f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103199190610d08565b6103c857600160009054906101000a90046001600160a01b03166001600160a01b03166328d703ef6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610370573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103989190810190610b66565b6103a1836106f1565b6040516020016103b2929190610d2a565b6040516020818303038152906040529050919050565b600154604051639effd22f60e01b8152600481018490526000916001600160a01b031690639effd22f90602401602060405180830381865afa158015610412573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104369190610d59565b90506000610443826106f1565b6001546040516366516cdf60e01b8152600481018590529192506000916001600160a01b03909116906366516cdf90602401600060405180830381865afa158015610492573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104ba9190810190610b66565b905060006104c7826101dd565b604080516208006081018252620800408152600060209182019081528251808401909352601a83527f646174613a696d6167652f7376672b786d6c3b6261736536342c00000000000091830191909152919250610525908290610666565b610538610531836107fa565b8290610666565b604080516208006080820183526208004080835260006020938401818152855193840186529183529183019182526001548451634aae736560e11b815294519194929361060f938a9384936105e2936001600160a01b039091169263955ce6ca92600480830193928290030181865afa1580156105b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105dd9190610d59565b6106f1565b868a6040516020016105f8959493929190610d72565b60408051601f198184030181529190528390610666565b60408051808201909152601d81527f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000602082015261064e908290610666565b61065a610531836107fa565b98975050505050505050565b601f1982015182518251603f199092019182906106839083610f28565b11156106e15760405162461bcd60e51b815260206004820152602760248201527f44796e616d69634275666665723a20417070656e64696e67206f7574206f66206044820152663137bab732399760c91b6064820152608401610178565b6106eb8484610964565b50505050565b6060816000036107185750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610742578061072c81610f40565b915061073b9050600a83610f6f565b915061071c565b60008167ffffffffffffffff81111561075d5761075d6109c3565b6040519080825280601f01601f191660200182016040528015610787576020820181803683370190505b5090505b84156107f25761079c600183610f83565b91506107a9600a86610f9a565b6107b4906030610f28565b60f81b8183815181106107c9576107c9610fae565b60200101906001600160f81b031916908160001a9053506107eb600a86610f6f565b945061078b565b949350505050565b8051606090600081900361081e575050604080516020810190915260008152919050565b6000600361082d836002610f28565b6108379190610f6f565b610842906004610fc4565b90506000610851826020610f28565b67ffffffffffffffff811115610869576108696109c3565b6040519080825280601f01601f191660200182016040528015610893576020820181803683370190505b5090506000604051806060016040528060408152602001610fe4604091399050600181016020830160005b8681101561091f576003818a01810151603f601282901c8116860151600c83901c8216870151600684901c831688015192909316870151600891821b60ff94851601821b92841692909201901b91160160e01b8352600490920191016108be565b506003860660018114610939576002811461094a57610956565b613d3d60f01b600119830152610956565b603d60f81b6000198301525b505050918152949350505050565b8051602082019150808201602084510184015b8184101561098f578351815260209384019301610977565b505082510190915250565b6000602082840312156109ac57600080fd5b81356001600160a01b03811681146102a457600080fd5b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610a0257610a026109c3565b604052919050565b600067ffffffffffffffff821115610a2457610a246109c3565b50601f01601f191660200190565b600060208284031215610a4457600080fd5b813567ffffffffffffffff811115610a5b57600080fd5b8201601f81018413610a6c57600080fd5b8035610a7f610a7a82610a0a565b6109d9565b818152856020838501011115610a9457600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015610acd578181015183820152602001610ab5565b838111156106eb5750506000910152565b60008151808452610af6816020860160208601610ab2565b601f01601f19169290920160200192915050565b6020815260006102a46020830184610ade565b600060208284031215610b2f57600080fd5b5035919050565b6000610b44610a7a84610a0a565b9050828152838383011115610b5857600080fd5b6102a4836020830184610ab2565b600060208284031215610b7857600080fd5b815167ffffffffffffffff811115610b8f57600080fd5b8201601f81018413610ba057600080fd5b6107f284825160208401610b36565b60008151610bc1818560208601610ab2565b9290920192915050565b7f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323081527f30302f737667222073686170652d72656e646572696e673d226372697370456460208201527f676573222077696474683d223130302522206865696768743d2231303025222060408201527f76657273696f6e3d22312e31222076696577426f783d2230203020313238203160608201527f3238222066696c6c3d2223666666223e3c726563742077696474683d2231323860808201527f22206865696768743d22313238222066696c6c3d222366666622202f3e3c672060a08201527f7472616e73666f726d3d227472616e736c6174652833322c333229223e00000060c082015260008251610ce78160dd850160208701610ab2565b691e17b39f1e17b9bb339f60b11b60dd93909101928301525060e701919050565b600060208284031215610d1a57600080fd5b815180151581146102a457600080fd5b60008351610d3c818460208801610ab2565b835190830190610d50818360208801610ab2565b01949350505050565b600060208284031215610d6b57600080fd5b5051919050565b7f7b2273796d626f6c223a2250484f544f222c226e616d65223a2250686f746f2081526b436f6c6c656374696f6e202360a01b602082015260008651610dbf81602c850160208b01610ab2565b7f2045646974696f6e222c226465736372697074696f6e223a22412074696e7920602c918401918201527f65646974696f6e206f662050686f746f20436f6c6c656374696f6e2023000000604c8201528651610e22816069840160208b01610ab2565b6c0171022b234ba34b7b71037b31609d1b606992909101918201528551610e50816076840160208a01610ab2565b7f2c203634783634707820696e2073697a652c2073746f7265642066756c6c7920607692909101918201527337b716b1b430b4b71711161134b6b0b3b2911d1160611b609682015261065a610ef4610eee610eae60aa850189610baf565b7f222c2265787465726e616c5f75726c223a2268747470733a2f2f73616d6b696e81526d672e70686f746f2f70686f746f2f60901b6020820152602e0190565b86610baf565b71222c2261747472696275746573223a5b5d7d60701b815260120190565b634e487b7160e01b600052601160045260246000fd5b60008219821115610f3b57610f3b610f12565b500190565b600060018201610f5257610f52610f12565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082610f7e57610f7e610f59565b500490565b600082821015610f9557610f95610f12565b500390565b600082610fa957610fa9610f59565b500690565b634e487b7160e01b600052603260045260246000fd5b6000816000190483118215151615610fde57610fde610f12565b50029056fe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa2646970667358221220ced6ab0b31889582a7206dcef4cb3627a45c6a6584af04fb3bf95eb5b69824c064736f6c634300080e0033";

type ICE64RendererConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ICE64RendererConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ICE64Renderer__factory extends ContractFactory {
  constructor(...args: ICE64RendererConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    owner: string,
    ice64_: string,
    xqstgfx_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ICE64Renderer> {
    return super.deploy(
      owner,
      ice64_,
      xqstgfx_,
      overrides || {}
    ) as Promise<ICE64Renderer>;
  }
  getDeployTransaction(
    owner: string,
    ice64_: string,
    xqstgfx_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(owner, ice64_, xqstgfx_, overrides || {});
  }
  attach(address: string): ICE64Renderer {
    return super.attach(address) as ICE64Renderer;
  }
  connect(signer: Signer): ICE64Renderer__factory {
    return super.connect(signer) as ICE64Renderer__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ICE64RendererInterface {
    return new utils.Interface(_abi) as ICE64RendererInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ICE64Renderer {
    return new Contract(address, _abi, signerOrProvider) as ICE64Renderer;
  }
}
