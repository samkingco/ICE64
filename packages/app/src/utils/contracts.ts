import ICE64Abi from "@ice64/contracts/abi/contracts/ICE64.sol/ICE64.json";
import ICE64DataStoreAbi from "@ice64/contracts/abi/contracts/ICE64DataStore.sol/ICE64DataStore.json";
import ICE64RendererAbi from "@ice64/contracts/abi/contracts/ICE64Renderer.sol/ICE64Renderer.json";
import deploysJson from "@ice64/contracts/deploys.json";
import { ethers } from "ethers";

export type ChainName = "mainnet" | "rinkeby" | "localhost";

const specifiedChainId = process.env.NEXT_PUBLIC_CHAIN_ID;
const chainId = specifiedChainId ? parseInt(specifiedChainId, 10) : 1;

interface Network {
  id: number;
  name: ChainName;
}

const networks: Record<number, Network> = {
  1: {
    id: 1,
    name: "mainnet",
  },
  4: {
    id: 4,
    name: "rinkeby",
  },
  31337: {
    id: 31337,
    name: "localhost",
  },
};

export const targetNetwork = networks[chainId];

export type ContractName = "ICE64" | "ICE64DataStore" | "ICE64Renderer";

interface DeployedContract {
  address: string;
  blockNumber: number;
}

type Deploy = Record<ChainName, DeployedContract>;
type Deploys = Record<ContractName, Deploy>;

const deploys = deploysJson as Deploys;

console.log(deploys);

export function deployedAddress(
  contract: ContractName,
  network = targetNetwork
) {
  return deploys[contract][network.name].address;
}

export function deployedAbi(contract: ContractName) {
  switch (contract) {
    case "ICE64":
      return ICE64Abi;
    case "ICE64DataStore":
      return ICE64DataStoreAbi;
    case "ICE64Renderer":
      return ICE64RendererAbi;
    default:
      return ICE64Abi;
  }
}

export function isChainSupportedForContract(
  contract: ContractName,
  network = targetNetwork
) {
  return Boolean(deploys[contract][network.name]);
}

export const ice64Settings = {
  priceOriginal: ethers.utils.parseEther("0.32"),
  priceEdition: ethers.utils.parseEther("0.04"),
  maxEditions: 64,
};
