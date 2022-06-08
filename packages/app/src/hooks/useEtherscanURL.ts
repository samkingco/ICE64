import { targetNetwork } from "../utils/contracts";

export function useEtherscanURL() {
  const chainId = targetNetwork.id;
  const etherscan = `https://${chainId !== 1 ? `${chainId}.` : ""}etherscan.io`;
  return etherscan;
}
