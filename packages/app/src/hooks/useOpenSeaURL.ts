import { useNetwork } from "wagmi";
import { chainIdToName } from "../utils/contracts";

export function useOpenSeaURL() {
  const { activeChain } = useNetwork();
  let chainId = activeChain?.id;
  const chainName = chainIdToName(chainId);

  const opensea = `https://${
    chainName !== "mainnet" ? "testnets." : ""
  }opensea.io`;

  return opensea;
}
