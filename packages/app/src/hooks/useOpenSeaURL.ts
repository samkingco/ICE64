import { targetNetwork } from "../utils/contracts";

export function useOpenSeaURL() {
  const chainId = targetNetwork.id;
  const opensea = `https://${chainId !== 1 ? "testnets." : ""}opensea.io`;
  return opensea;
}
