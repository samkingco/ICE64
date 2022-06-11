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
        name: "ice64_",
        type: "address",
      },
      {
        internalType: "address",
        name: "ice64DataStore_",
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
    inputs: [],
    name: "dataStore",
    outputs: [
      {
        internalType: "contract IICE64DataStore",
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
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getEditionPhotoBase64SVG",
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
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getEditionPhotoSVG",
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
        internalType: "contract IExquisiteGraphics",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506040516112e33803806112e383398101604081905261002f9161008d565b600080546001600160a01b039485166001600160a01b0319918216179091556001805493851693821693909317909255600280549190931691161790556100d0565b80516001600160a01b038116811461008857600080fd5b919050565b6000806000606084860312156100a257600080fd5b6100ab84610071565b92506100b960208501610071565b91506100c760408501610071565b90509250925092565b611204806100df6000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063b1bdd9dc1161005b578063b1bdd9dc14610103578063b855b7cb14610116578063c87b56dd14610129578063e88741691461013c57600080fd5b806340a0a3b01461008d578063603f14da146100bd578063660d0d67146100dd5780637b4dfbf9146100f0575b600080fd5b6000546100a0906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b6100d06100cb366004610b07565b61014f565b6040516100b49190610bdf565b6001546100a0906001600160a01b031681565b6100d06100fe366004610bf2565b610160565b6100d0610111366004610b07565b61025d565b6100d0610124366004610bf2565b61032b565b6100d0610137366004610bf2565b6103ad565b6002546100a0906001600160a01b031681565b606061015a8261025d565b92915050565b600154604051636a934c0560e11b8152600481018390526060916000916001600160a01b039091169063d526980a90602401600060405180830381865afa1580156101af573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526101d79190810190610c3b565b905060006101e48261025d565b604080516208006081018252620800408152600060209182019081528251808401909352601a83527f646174613a696d6167652f7376672b786d6c3b6261736536342c00000000000091830191909152919250610242908290610768565b61025561024e836107f7565b8290610768565b949350505050565b600254604051630a19259560e01b81526060916000916001600160a01b0390911690630a19259590610293908690600401610bdf565b600060405180830381865afa1580156102b0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102d89190810190610c3b565b6040805162080060810190915262080040815260006020909101818152919250506103248260405160200161030d9190610ca0565b60408051601f198184030181529190528290610768565b9392505050565b600154604051636a934c0560e11b8152600481018390526060916000916001600160a01b039091169063d526980a90602401600060405180830381865afa15801561037a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103a29190810190610c3b565b90506103248161014f565b600054604051631a76aedf60e21b8152600481018390526060916001600160a01b0316906369dabb7c90602401602060405180830381865afa1580156103f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061041b9190610ddd565b6104ca57600160009054906101000a90046001600160a01b03166001600160a01b031663714c53986040518163ffffffff1660e01b8152600401600060405180830381865afa158015610472573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261049a9190810190610c3b565b6104a383610961565b6040516020016104b4929190610dff565b6040516020818303038152906040529050919050565b60008054604051639effd22f60e01b8152600481018590526001600160a01b0390911690639effd22f90602401602060405180830381865afa158015610514573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105389190610e2e565b9050600061054582610961565b600154604051636a934c0560e11b8152600481018590529192506000916001600160a01b039091169063d526980a90602401600060405180830381865afa158015610594573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105bc9190810190610c3b565b905060006105c98261025d565b604080516208006081018252620800408152600060209182019081528251808401909352601a83527f646174613a696d6167652f7376672b786d6c3b6261736536342c00000000000091830191909152919250610627908290610768565b61063361024e836107f7565b6040805162080060808201835262080040808352600060209384018181528551938401865291835291830182815291548451634aae736560e11b8152945191949293610711938a9384936106dc936001600160a01b039091169263955ce6ca92600480830193928290030181865afa1580156106b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d79190610e2e565b610961565b866106e68e610961565b6040516020016106fa959493929190610e47565b60408051601f198184030181529190528390610768565b60408051808201909152601d81527f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c0000006020820152610750908290610768565b61075c61024e836107f7565b98975050505050505050565b601f1982015182518251603f1990920191829061078590836110d3565b11156107e75760405162461bcd60e51b815260206004820152602760248201527f44796e616d69634275666665723a20417070656e64696e67206f7574206f66206044820152663137bab732399760c91b606482015260840160405180910390fd5b6107f18484610a62565b50505050565b8051606090600081900361081b575050604080516020810190915260008152919050565b6000600361082a8360026110d3565b6108349190611101565b61083f906004611115565b9050600061084e8260206110d3565b67ffffffffffffffff81111561086657610866610a98565b6040519080825280601f01601f191660200182016040528015610890576020820181803683370190505b509050600060405180606001604052806040815260200161118f604091399050600181016020830160005b8681101561091c576003818a01810151603f601282901c8116860151600c83901c8216870151600684901c831688015192909316870151600891821b60ff94851601821b92841692909201901b91160160e01b8352600490920191016108bb565b506003860660018114610936576002811461094757610953565b613d3d60f01b600119830152610953565b603d60f81b6000198301525b505050918152949350505050565b6060816000036109885750506040805180820190915260018152600360fc1b602082015290565b8160005b81156109b2578061099c81611134565b91506109ab9050600a83611101565b915061098c565b60008167ffffffffffffffff8111156109cd576109cd610a98565b6040519080825280601f01601f1916602001820160405280156109f7576020820181803683370190505b5090505b841561025557610a0c60018361114d565b9150610a19600a86611164565b610a249060306110d3565b60f81b818381518110610a3957610a39611178565b60200101906001600160f81b031916908160001a905350610a5b600a86611101565b94506109fb565b8051602082019150808201602084510184015b81841015610a8d578351815260209384019301610a75565b505082510190915250565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610ad757610ad7610a98565b604052919050565b600067ffffffffffffffff821115610af957610af9610a98565b50601f01601f191660200190565b600060208284031215610b1957600080fd5b813567ffffffffffffffff811115610b3057600080fd5b8201601f81018413610b4157600080fd5b8035610b54610b4f82610adf565b610aae565b818152856020838501011115610b6957600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b83811015610ba2578181015183820152602001610b8a565b838111156107f15750506000910152565b60008151808452610bcb816020860160208601610b87565b601f01601f19169290920160200192915050565b6020815260006103246020830184610bb3565b600060208284031215610c0457600080fd5b5035919050565b6000610c19610b4f84610adf565b9050828152838383011115610c2d57600080fd5b610324836020830184610b87565b600060208284031215610c4d57600080fd5b815167ffffffffffffffff811115610c6457600080fd5b8201601f81018413610c7557600080fd5b61025584825160208401610c0b565b60008151610c96818560208601610b87565b9290920192915050565b7f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323081527f30302f737667222073686170652d72656e646572696e673d226372697370456460208201527f676573222077696474683d223130302522206865696768743d2231303025222060408201527f76657273696f6e3d22312e31222076696577426f783d2230203020313238203160608201527f3238222066696c6c3d2223666666223e3c726563742077696474683d2231323860808201527f22206865696768743d22313238222066696c6c3d222366666622202f3e3c672060a08201527f7472616e73666f726d3d227472616e736c6174652833322c333229223e00000060c082015260008251610dbc8160dd850160208701610b87565b691e17b39f1e17b9bb339f60b11b60dd93909101928301525060e701919050565b600060208284031215610def57600080fd5b8151801515811461032457600080fd5b60008351610e11818460208801610b87565b835190830190610e25818360208801610b87565b01949350505050565b600060208284031215610e4057600080fd5b5051919050565b7f7b2273796d626f6c223a224943453634222c226e616d65223a224943453634208152602360f81b602082015260008651610e89816021850160208b01610b87565b7f202845646974696f6e29222c226465736372697074696f6e223a22412066756c6021918401918201527f6c79206f6e2d636861696e2065646974696f6e206f662049434536342023000060418201528651610eec81605f840160208b01610b87565b710171022b234ba34b7b71039b4bd329037b3160751b605f92909101918201528551610f1f816071840160208a01610b87565b7f2e20456163682065646974696f6e206973203634783634707820696e2073697a607192909101918201527f6520776974682061203332707820626f726465722c20363420636f6c6f72732c60918201527f20616e642073746f726564206f6e2074686520457468657265756d20626c6f6360b18201527f6b636861696e20666f72657665722e222c22696d616765223a2200000000000060d182015261075c61101461100e610fd260eb850189610c84565b7f222c2265787465726e616c5f75726c223a2268747470733a2f2f69636536342e815269636f6d2f70686f746f2f60b01b6020820152602a0190565b86610c84565b7f222c2261747472696275746573223a5b7b2274726169745f74797065223a225381527f697a65222c2276616c7565223a2236347836347078227d2c7b2274726169745f60208201527f74797065223a22426f72646572222c2276616c7565223a2233327078227d2c7b60408201527f2274726169745f74797065223a22436f6c6f7273222c2276616c7565223a223660608201526434227d5d7d60d81b608082015260850190565b634e487b7160e01b600052601160045260246000fd5b600082198211156110e6576110e66110bd565b500190565b634e487b7160e01b600052601260045260246000fd5b600082611110576111106110eb565b500490565b600081600019048311821515161561112f5761112f6110bd565b500290565b600060018201611146576111466110bd565b5060010190565b60008282101561115f5761115f6110bd565b500390565b600082611173576111736110eb565b500690565b634e487b7160e01b600052603260045260246000fdfe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa26469706673582212209a74478b66c54b90c96eda7b0ee9c68606a0e39baecdd2e59852fd6b2d7a0da064736f6c634300080e0033";

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
    ice64_: string,
    ice64DataStore_: string,
    xqstgfx_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ICE64Renderer> {
    return super.deploy(
      ice64_,
      ice64DataStore_,
      xqstgfx_,
      overrides || {}
    ) as Promise<ICE64Renderer>;
  }
  getDeployTransaction(
    ice64_: string,
    ice64DataStore_: string,
    xqstgfx_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      ice64_,
      ice64DataStore_,
      xqstgfx_,
      overrides || {}
    );
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
