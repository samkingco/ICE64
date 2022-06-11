export function gatewayURL(url: string) {
  if (url.startsWith("ipfs")) {
    return {
      type: "IPFS",
      url: IPFStoGateway(url),
    };
  }
  if (url.startsWith("ar")) {
    return {
      type: "Arweave",
      url: ARtoGateway(url),
    };
  }
  return {
    type: "Unknown",
    url,
  };
}

export function IPFStoGateway(ipfs: string) {
  return ipfs.replace("ipfs://", "https://ipfs.io/ipfs/");
}

export function ARtoGateway(ar: string) {
  return ar.replace("ar://", "https://arweave.net/");
}
