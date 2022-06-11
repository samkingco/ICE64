import { useNetwork } from "wagmi";

export enum ConnectedStatus {
  NotConnected,
  WrongNetwork,
  SwitchingNetwork,
  Connected,
}

export function useConnectedStatus() {
  const { activeChain } = useNetwork();
  let connectedStatus = ConnectedStatus.NotConnected;
  if (activeChain) {
    connectedStatus = activeChain.unsupported
      ? ConnectedStatus.WrongNetwork
      : ConnectedStatus.Connected;
  }

  return { connectedStatus };
}
