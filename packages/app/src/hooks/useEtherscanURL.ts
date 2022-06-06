import { useNetwork } from "wagmi";
import { chainIdToName } from "../utils/contracts";

export function useEtherscanURL() {
  const { activeChain } = useNetwork();
  let chainId = activeChain?.id;
  const chainName = chainIdToName(chainId);

  const etherscan = `https://${
    chainName !== "mainnet" ? `${chainName}.` : ""
  }etherscan.io`;

  return etherscan;
}
