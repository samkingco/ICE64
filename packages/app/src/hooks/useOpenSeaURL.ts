import { targetNetwork } from "../utils/contracts";

export function useOpenSeaURL() {
  const chainName = targetNetwork.name;

  const opensea = `https://${
    chainName !== "mainnet" ? "testnets." : ""
  }opensea.io`;

  return opensea;
}
