/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { XQSTGFX, XQSTGFXInterface } from "../XQSTGFX";

const _abi = [
  {
    inputs: [],
    name: "BackgroundColorIndexOutOfRange",
    type: "error",
  },
  {
    inputs: [],
    name: "ExceededMaxColors",
    type: "error",
  },
  {
    inputs: [],
    name: "ExceededMaxColumns",
    type: "error",
  },
  {
    inputs: [],
    name: "ExceededMaxPixels",
    type: "error",
  },
  {
    inputs: [],
    name: "ExceededMaxRows",
    type: "error",
  },
  {
    inputs: [],
    name: "MissingHeader",
    type: "error",
  },
  {
    inputs: [],
    name: "NotEnoughData",
    type: "error",
  },
  {
    inputs: [],
    name: "PixelColorIndexOutOfRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "decodeHeader",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "width",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "height",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "numColors",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "backgroundColorIndex",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "scale",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "reserved",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "alpha",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "hasBackground",
            type: "bool",
          },
          {
            internalType: "uint16",
            name: "totalPixels",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "bpp",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "ppb",
            type: "uint8",
          },
          {
            internalType: "uint16",
            name: "paletteStart",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "dataStart",
            type: "uint16",
          },
        ],
        internalType: "struct IGraphics.Header",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
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
    name: "decodePalette",
    outputs: [
      {
        internalType: "bytes8[]",
        name: "",
        type: "bytes8[]",
      },
    ],
    stateMutability: "pure",
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
    name: "draw",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
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
    name: "drawRects",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
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
    name: "drawRectsUnsafe",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
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
    name: "drawUnsafe",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
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
    name: "valid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
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
    name: "validHeader",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611e21806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80639e9794521161005b5780639e97945214610119578063d38f7d161461012c578063dcd810601461013f578063f66288371461015257600080fd5b806320b345dd1461008d57806331dfea51146100b65780634041ab2d146100d957806364daf9d6146100f9575b600080fd5b6100a061009b366004611776565b610165565b6040516100ad9190611853565b60405180910390f35b6100c96100c4366004611776565b610179565b60405190151581526020016100ad565b6100ec6100e7366004611776565b610184565b6040516100ad9190611886565b61010c610107366004611776565b610198565b6040516100ad91906118d4565b6100a0610127366004611776565b6101a9565b6100a061013a366004611776565b6101b8565b6100a061014d366004611776565b6101c6565b6100c9610160366004611776565b6101d5565b6060610173826001806101e8565b92915050565b600061017382610255565b606061017382610193846102a4565b6103e6565b6101a06116b7565b610173826102a4565b606061017382600060016101e8565b6060610173826000806101e8565b606061017382600160006101e8565b60006101736101e3836102a4565b610612565b60606101f261172b565b604080516204006081019091526204004081526000602090910190815261021a828786610720565b600185600181111561022e5761022e6119d9565b146102425761023d8282610795565b61024c565b61024c82826107ff565b95945050505050565b600061025f61172b565b610268836102a4565b6020820181905261027890610612565b506102878160200151846109ab565b506102968382602001516103e6565b604090910152506001919050565b6102ac6116b7565b6008825110156102cf57604051632231929d60e01b815260040160405180910390fd5b600882015160ff603882901c81168352603082901c81166020840152602882901c81166040840152601882901c61ffff166060840152601082901c166080830152603f600682901c1660a0830152600f600282901c1660c0830152600181811c81161461033d576000610340565b60015b151560e083015260018082161461035857600061035b565b60015b1515610100830152604082015160208301516103779190611a05565b61ffff16610120830152600861018083015260e08201516103b25760608201516103a2906003611a05565b6103ad906008611a2f565b6103cd565b60608201516103c2906004611a05565b6103cd906008611a2f565b61ffff166101a08301526103e082610a64565b50919050565b60608181015161ffff16156105be57816101a0015161ffff168351101561042057604051630218e1cf60e31b815260040160405180910390fd5b600082610180015160206104349190611a2f565b61ffff1690508260e0015115610500576000836060015161ffff1667ffffffffffffffff81111561046757610467611760565b604051908082528060200260200182016040528015610490578160200160208202803683370190505b50925060005b846060015161ffff168110156104f9578286015191506104b582610ae3565b8482815181106104c7576104c7611a55565b6001600160c01b03199092166020928302919091019091015260049290920191806104f181611a6b565b915050610496565b50506105b8565b6000836060015161ffff1667ffffffffffffffff81111561052357610523611760565b60405190808252806020026020018201604052801561054c578160200160208202803683370190505b50925060005b846060015161ffff168110156105b55782860151915061057182610bd3565b84828151811061058357610583611a55565b6001600160c01b03199092166020928302919091019091015260039290920191806105ad81611a6b565b915050610552565b50505b50610173565b60408051600280825260608201835290916020830190803683370190505090506000816001815181106105f3576105f3611a55565b6001600160c01b03199092166020928302919091019091015292915050565b600061271061ffff168260400151836020015161062f9190611a05565b61ffff16111561065257604051631db0a30f60e31b815260040160405180910390fd5b60ff8016826040015161ffff16111561067e5760405163d2e252d560e01b815260040160405180910390fd5b60ff8016826020015161ffff1611156106aa576040516362671b5f60e11b815260040160405180910390fd5b61010061ffff16826060015161ffff1611156106d957604051634cae148960e01b815260040160405180910390fd5b81610100015180156106fa5750816060015161ffff16826080015160ff1610155b1561071857604051631a4b0ec760e21b815260040160405180910390fd5b506001919050565b610729826102a4565b60208401528015610752576107418360200151610612565b506107508360200151836109ab565b505b6107608284602001516103e6565b60408401526020830151610775908390610c96565b60608401526020830151610788906111c0565b8360800181905250505050565b61079f82826112b7565b60208201516060015161ffff1615806107c45750600182602001516060015161ffff16115b156107d3576107d382826107ff565b6040805180820190915260068152651e17b9bb339f60d11b60208201526107fb90829061145a565b5050565b60008060005b8460200151610120015161ffff168110156109a4578460600151818151811061083057610830611a55565b602002602001015160ff16925061084785846114e9565b1561085e578061085681611a6b565b915050610805565b600191505b602080860151015161ffff166108798383611a84565b6108839190611ab2565b156108ca5760608501516108978383611a84565b815181106108a7576108a7611a55565b602002602001015160ff1683036108ca57816108c281611a6b565b925050610863565b61099d856040015184815181106108e3576108e3611a55565b6020026020010151866080015187602001516020015161ffff16846109089190611ab2565b8151811061091857610918611a55565b6020026020010151876080015188602001516020015161ffff168561093d9190611ac6565b8151811061094d5761094d611a55565b60200260200101518860800151868151811061096b5761096b611a55565b60200260200101516040516020016109869493929190611ada565b60408051601f19818403018152919052859061145a565b8101610805565b5050505050565b60008060028461012001516109c09190611b99565b61ffff1615806109d8575083610160015160ff166001145b610a055783610160015160ff168461012001516109f59190611bba565b610a00906001611a2f565b610a1e565b83610160015160ff16846101200151610a1e9190611bba565b61ffff16905080846101a0015161ffff16610a399190611a84565b83511015610a5a57604051630218e1cf60e31b815260040160405180910390fd5b5060019392505050565b6010816060015161ffff161115610a88576008610140820152600161016082015250565b6004816060015161ffff161115610aac576004610140820152600261016082015250565b6002816060015161ffff161115610ad0576002610140820152600461016082015250565b6001610140820152600861016082015250565b60008060005b6004811015610bc957610afd816002611bdb565b610b08906006611bfa565b610b13906008611bdb565b67ffffffffffffffff16610b41858360048110610b3257610b32611a55565b1a60f81b600f60f81b16611547565b60ff16901b9190911790610b56816002611bdb565b610b61906006611bfa565b610b6c906001611a84565b610b77906008611bdb565b67ffffffffffffffff16610bad6004868460048110610b9857610b98611a55565b1a60f81b6001600160f81b031916901c611547565b60ff16901b919091179080610bc181611a6b565b915050610ae9565b5060c01b92915050565b6000616666815b6003811015610bc957610bee816002611bdb565b610bf9906006611bfa565b610c04906008611bdb565b67ffffffffffffffff16610c23858360038110610b3257610b32611a55565b60ff16901b9190911790610c38816002611bdb565b610c43906006611bfa565b610c4e906001611a84565b610c59906008611bdb565b67ffffffffffffffff16610c7a6004868460038110610b9857610b98611a55565b60ff16901b919091179080610c8e81611a6b565b915050610bda565b606060008261012001516008610cac9190611a2f565b61ffff1667ffffffffffffffff811115610cc857610cc8611760565b604051908082528060200260200182016040528015610cf1578160200160208202803683370190505b50915082610140015160ff16600103610f185760005b83610120015161ffff16811015610f12576101a0840151859061ffff16610d2f600884611ac6565b610d399190611a84565b81518110610d4957610d49611a55565b602001015160f81c60f81b60f81c915060078260ff16901c838281518110610d7357610d73611a55565b602002602001019060ff16908160ff168152505060068260ff16901c60011683826001610da09190611a84565b81518110610db057610db0611a55565b60ff909216602092830291909101909101526001600583901c1683610dd6836002611a84565b81518110610de657610de6611a55565b60ff909216602092830291909101909101526001600483901c1683610e0c836003611a84565b81518110610e1c57610e1c611a55565b60ff909216602092830291909101909101526001600383901c1683610e42836004611a84565b81518110610e5257610e52611a55565b60ff909216602092830291909101909101526001600283901c1683610e78836005611a84565b81518110610e8857610e88611a55565b60ff90921660209283029190910190910152600182811c1683610eac836006611a84565b81518110610ebc57610ebc611a55565b60ff909216602092830291909101909101526001821683610ede836007611a84565b81518110610eee57610eee611a55565b60ff90921660209283029190910190910152610f0b600882611a84565b9050610d07565b506111b9565b82610140015160ff166002036110645760005b83610120015161ffff16811015610f12576101a0840151859061ffff16610f53600484611ac6565b610f5d9190611a84565b81518110610f6d57610f6d611a55565b602001015160f81c60f81b60f81c915060068260ff16901c838281518110610f9757610f97611a55565b60ff909216602092830291909101909101526003600483901c1683610fbd836001611a84565b81518110610fcd57610fcd611a55565b602002602001019060ff16908160ff168152505060028260ff16901c60031683826002610ffa9190611a84565b8151811061100a5761100a611a55565b602002602001019060ff16908160ff168152505081600316838260036110309190611a84565b8151811061104057611040611a55565b60ff9092166020928302919091019091015261105d600482611a84565b9050610f2b565b82610140015160ff166004036111395760005b83610120015161ffff16811015610f12576101a0840151859061ffff1661109f600284611ac6565b6110a99190611a84565b815181106110b9576110b9611a55565b602001015160f81c60f81b60f81c915060048260ff16901c8382815181106110e3576110e3611a55565b60ff90921660209283029190910190910152600f821683611105836001611a84565b8151811061111557611115611a55565b60ff90921660209283029190910190910152611132600282611a84565b9050611077565b60005b83610120015161ffff168110156111b75784846101a0015161ffff16826111639190611a84565b8151811061117357611173611a55565b602001015160f81c60f81b60f81c83828151811061119357611193611a55565b60ff90921660209283029190910190910152806111af81611a6b565b91505061113c565b505b5092915050565b60606000826040015161ffff16836020015161ffff16116111e55782604001516111eb565b82602001515b6111f6906001611a2f565b61ffff16905080836060015161ffff1611611211578061121b565b826060015161ffff165b90508067ffffffffffffffff81111561123657611236611760565b60405190808252806020026020018201604052801561126957816020015b60608152602001906001900390816112545790505b50915060005b818110156112b05761128081611578565b83828151811061129257611292611a55565b602002602001018190525080806112a890611a6b565b91505061126f565b5050919050565b602082015160a0015161ffff1660008190036113225782602001516040015161ffff1683602001516020015161ffff16116112fa57826020015160400151611304565b8260200151602001515b61131090610200611bba565b61131b906001611a2f565b61ffff1690505b6113b461133a84602001516020015161ffff16611578565b61134f85602001516040015161ffff16611578565b61136f8487602001516020015161ffff1661136a9190611bdb565b611578565b61138a8588602001516040015161ffff1661136a9190611bdb565b60405160200161139d9493929190611c11565b60408051601f19818403018152919052839061145a565b826020015161010001511561145557611455836040015184602001516080015160ff16815181106113e7576113e7611a55565b6020026020010151846080015185602001516040015161ffff168151811061141157611411611a55565b6020026020010151856080015186602001516020015161ffff168151811061143b5761143b611a55565b602002602001015160405160200161139d93929190611d32565b505050565b601f1982015182518251603f199092019182906114779083611a84565b11156114d95760405162461bcd60e51b815260206004820152602760248201527f44796e616d69634275666665723a20417070656e64696e67206f7574206f66206044820152663137bab732399760c91b606482015260840160405180910390fd5b6114e38484611681565b50505050565b600082602001516101000151801561150b575082602001516080015160ff1682145b80611529575060208301516060015161ffff16158015611529575081155b80611540575082602001516060015161ffff168210155b9392505050565b6000600960f883901c116115695761156460f883901c6030611dc6565b610173565b61017360f883901c6057611dc6565b60608160000361159f5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156115c957806115b381611a6b565b91506115c29050600a83611ac6565b91506115a3565b60008167ffffffffffffffff8111156115e4576115e4611760565b6040519080825280601f01601f19166020018201604052801561160e576020820181803683370190505b5090505b841561167957611623600183611bfa565b9150611630600a86611ab2565b61163b906030611a84565b60f81b81838151811061165057611650611a55565b60200101906001600160f81b031916908160001a905350611672600a86611ac6565b9450611612565b949350505050565b8051602082019150808201602084510184015b818410156116ac578351815260209384019301611694565b505082510190915250565b604080516101c081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101829052610100810182905261012081018290526101408101829052610160810182905261018081018290526101a081019190915290565b6040518060a00160405280606081526020016117456116b7565b81526020016060815260200160608152602001606081525090565b634e487b7160e01b600052604160045260246000fd5b60006020828403121561178857600080fd5b813567ffffffffffffffff808211156117a057600080fd5b818401915084601f8301126117b457600080fd5b8135818111156117c6576117c6611760565b604051601f8201601f19908116603f011681019083821181831017156117ee576117ee611760565b8160405282815287602084870101111561180757600080fd5b826020860160208301376000928101602001929092525095945050505050565b60005b8381101561184257818101518382015260200161182a565b838111156114e35750506000910152565b6020815260008251806020840152611872816040850160208701611827565b601f01601f19169190910160400192915050565b6020808252825182820181905260009190848201906040850190845b818110156118c85783516001600160c01b031916835292840192918401916001016118a2565b50909695505050505050565b815160ff1681526101c0810160208301516118f5602084018261ffff169052565b50604083015161190b604084018261ffff169052565b506060830151611921606084018261ffff169052565b506080830151611936608084018260ff169052565b5060a083015161194c60a084018261ffff169052565b5060c083015161196160c084018260ff169052565b5060e083015161197560e084018215159052565b50610100838101511515908301526101208084015161ffff908116918401919091526101408085015160ff908116918501919091526101608086015190911690840152610180808501518216908401526101a08085015191821681850152906111b7565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600061ffff80831681851681830481118215151615611a2657611a266119ef565b02949350505050565b600061ffff808316818516808303821115611a4c57611a4c6119ef565b01949350505050565b634e487b7160e01b600052603260045260246000fd5b600060018201611a7d57611a7d6119ef565b5060010190565b60008219821115611a9757611a976119ef565b500190565b634e487b7160e01b600052601260045260246000fd5b600082611ac157611ac1611a9c565b500690565b600082611ad557611ad5611a9c565b500490565b6c3c726563742066696c6c3d222360981b81526001600160c01b03198516600d8201526411103c1e9160d91b60158201528351600090611b2181601a850160208901611827565b6411103c9e9160d91b601a918401918201528451611b4681601f840160208901611827565b7311103432b4b3b43a1e911891103bb4b23a341e9160611b601f92909101918201528351611b7b816033840160208801611827565b6211179f60e91b603392909101918201526036019695505050505050565b600061ffff80841680611bae57611bae611a9c565b92169190910692915050565b600061ffff80841680611bcf57611bcf611a9c565b92169190910492915050565b6000816000190483118215151615611bf557611bf56119ef565b500290565b600082821015611c0c57611c0c6119ef565b500390565b7f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323081527f30302f737667222073686170652d72656e646572696e673d226372697370456460208201527f676573222076657273696f6e3d22312e31222076696577426f783d2230203020604082015260008551611c95816060850160208a01611827565b600160fd1b6060918401918201528551611cb6816061840160208a01611827565b6811103bb4b23a341e9160b91b606192909101918201528451611ce081606a840160208901611827565b6060818301019150506911103432b4b3b43a1e9160b11b600a8201528351611d0f816014840160208801611827565b611d2660148284010161111f60f11b815260020190565b98975050505050505050565b6d223c726563742066696c6c3d222360901b81526001600160c01b03198416600e8201526911103432b4b3b43a1e9160b11b60168201528251600090611d7f816020808601908801611827565b80830190506811103bb4b23a341e9160b91b60208201528351611da9816029840160208801611827565b6211179f60e91b60299290910191820152602c0195945050505050565b600060ff821660ff84168060ff03821115611de357611de36119ef565b01939250505056fea2646970667358221220a127d92b86f377259d1c9fd543f8f88f4d5cf31d2a4dbac0e9f161cfe9ccec7164736f6c634300080e0033";

type XQSTGFXConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: XQSTGFXConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class XQSTGFX__factory extends ContractFactory {
  constructor(...args: XQSTGFXConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<XQSTGFX> {
    return super.deploy(overrides || {}) as Promise<XQSTGFX>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): XQSTGFX {
    return super.attach(address) as XQSTGFX;
  }
  connect(signer: Signer): XQSTGFX__factory {
    return super.connect(signer) as XQSTGFX__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): XQSTGFXInterface {
    return new utils.Interface(_abi) as XQSTGFXInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): XQSTGFX {
    return new Contract(address, _abi, signerOrProvider) as XQSTGFX;
  }
}
