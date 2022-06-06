import ICE64Abi from "@ice64/contracts/abi/contracts/ICE64.sol/ICE64.json";
import ICE64RendererAbi from "@ice64/contracts/abi/contracts/ICE64Renderer.sol/ICE64Renderer.json";
import deploysJson from "@ice64/contracts/deploys.json";

export type ContractName = "ICE64" | "ICE64Renderer";

interface DeployedContract {
  address: string;
  blockNumber: number;
}

export type ChainName = "mainnet" | "rinkeby" | "localhost";
type Deploy = Record<ChainName, DeployedContract>;
type Deploys = Record<ContractName, Deploy>;

const deploys = deploysJson as Deploys;

const network: ChainName =
  process.env.NODE_ENV === "production" ? "mainnet" : "rinkeby";

export function deployedAddress(contract: ContractName, chainName = network) {
  const deploy = deploys[contract][chainName];
  if (!deploy) return deploys[contract][network].address;
  return deploys[contract][chainName].address;
}

export function deployedAbi(contract: ContractName) {
  switch (contract) {
    case "ICE64":
      return ICE64Abi;
    case "ICE64Renderer":
      return ICE64RendererAbi;
    default:
      return ICE64Abi;
  }
}

export function isChainSupportedForContract(
  contract: ContractName,
  chainName = network
) {
  return Boolean(deploys[contract][chainName]);
}

export function chainNameToId(chainName = network) {
  switch (chainName) {
    case "mainnet":
      return 1;
    case "rinkeby":
      return 4;
    case "localhost":
      return 1337;
    default:
      return 1;
  }
}

export function chainIdToName(chainId = chainNameToId()): ChainName {
  switch (chainId) {
    case 1:
      return "mainnet";
    case 4:
      return "rinkeby";
    case 1337:
      return "localhost";
    default:
      return "mainnet";
  }
}
