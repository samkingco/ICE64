import { targetNetwork } from "../utils/contracts";

export function useEtherscanURL() {
  const chainName = targetNetwork.name;

  const etherscan = `https://${
    chainName !== "mainnet" ? `${chainName}.` : ""
  }etherscan.io`;

  return etherscan;
}
