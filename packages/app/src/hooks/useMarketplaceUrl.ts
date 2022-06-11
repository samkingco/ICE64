import { deployedAddress, targetNetwork } from "../utils/contracts";

export function useMarketplaceTokenURL(id: number) {
  const chainId = targetNetwork.id;
  const chainName = targetNetwork.name;
  const contract = deployedAddress("ICE64");
  const opensea = `https://${
    chainId !== 1 ? "testnets." : ""
  }opensea.io/assets/${contract}/${id}`;
  const looksrare = `https://${
    chainId !== 1 ? `${chainName}.` : ""
  }looksrare.org/collections/${contract}/${id}`;
  const gem = `https://gem.xyz/asset/${contract}/${id}`;

  return {
    opensea,
    looksrare,
    gem,
  };
}
