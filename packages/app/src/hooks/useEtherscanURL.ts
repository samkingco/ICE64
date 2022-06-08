import { targetNetwork } from "../utils/contracts";

export function useEtherscanURL() {
  const chainId = targetNetwork.id;
  const chainName = targetNetwork.name;
  const etherscan = `https://${
    chainId !== 1 ? `${chainName}.` : ""
  }etherscan.io`;
  return etherscan;
}
