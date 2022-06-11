import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
} from "wagmi";
import {
  ConnectedStatus,
  useConnectedStatus,
} from "../hooks/useConnectedStatus";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useIsMounted } from "../hooks/useIsMounted";
import { targetNetwork } from "../utils/contracts";
import { buttonReset, MonoButton } from "./Button";
import { CopyToClipboard } from "./CopyToClipboard";
import { Divider } from "./Divider";
import { ENSAddress } from "./ENSAddress";
import { Modal } from "./Modal";
import { Body, Mono, Subheading } from "./Typography";
import { MetaMask, WallectConnect } from "./WalletProviderIcons";

const ModalContent = styled.div`
  width: 100%;
  background: var(--background);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 1px 32px rgba(0, 0, 0, 0.08);
  @media (min-width: 80rem) {
    padding: 2vw;
    border-radius: 2vw;
  }
`;

const modalInteractiveItemStyles = css`
  ${buttonReset};
  text-align: left;
  transition: background-color 150ms ease;
  border-radius: 0.5rem;
  padding: 8px 12px;
  background: var(--background-emphasis);
  &:hover {
    background: rgba(var(--foreground-alpha), 0.1);
    text-decoration: none;
  }
  @media (min-width: 80rem) {
    border-radius: 1vw;
    padding: 1vw 1.5vw;
  }
`;

const ModalItem = styled.div`
  min-width: 0;
  h3 {
    display: inline;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ConnectedChain = styled(ModalItem)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDot = styled.div<{ status: ConnectedStatus }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: green;
  ${(p) => {
    switch (p.status) {
      case ConnectedStatus.WrongNetwork:
        return css`
          background: red;
        `;
      case ConnectedStatus.SwitchingNetwork:
        return css`
          background: orange;
        `;
      case ConnectedStatus.Connected:
        return css`
          background: green;
        `;
      default:
        return css`
          background: rgba(var(--foreground-alpha), 0.48);
        `;
    }
  }}
`;

const ModalItemButton = styled(MonoButton)`
  ${modalInteractiveItemStyles};
  padding: 8px 12px;
  @media (min-width: 80rem) {
    padding: 1vw 1.5vw;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const ModalItemLink = styled.a`
  ${modalInteractiveItemStyles};
  padding: 8px 12px;
  @media (min-width: 80rem) {
    padding: 1vw 1.5vw;
  }
`;

const ProviderButton = styled(ModalItemButton)`
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  grid-gap: 0.5rem;
  align-items: center;
  @media (min-width: 80rem) {
    grid-template-columns: 1.5vw 1fr;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectWalletModal({ isOpen, onClose }: Props) {
  const isMounted = useIsMounted();
  const { connect, connectors } = useConnect();

  return isMounted ? (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      a11yLabel="Connect your wallet"
      size="sm"
    >
      <ModalContent>
        <Subheading>Connect wallet</Subheading>
        {connectors.map((connector) => (
          <ProviderButton
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => {
              connect(connector);
              onClose();
            }}
          >
            {connector.name === "MetaMask" && <MetaMask />}
            {connector.name === "WalletConnect" && <WallectConnect />}
            {connector.name}
          </ProviderButton>
        ))}
      </ModalContent>
    </Modal>
  ) : null;
}

export function WalletInfoModal({ isOpen, onClose }: Props) {
  const isMounted = useIsMounted();
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
    watch: true,
  });

  const { disconnect } = useDisconnect();
  const { activeChain, switchNetwork } = useNetwork();
  const { connectedStatus } = useConnectedStatus();

  const etherscan = useEtherscanURL();

  return account && isMounted ? (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      a11yLabel="Connected wallet information"
      size="sm"
    >
      <ModalContent>
        <ModalItem>
          <Subheading>
            <CopyToClipboard
              copyText={account.address || ""}
              success="Copied to clipboard"
            >
              <ENSAddress address={account.address || ""} />
            </CopyToClipboard>
          </Subheading>
          {balance && <Mono subdued>{balance.formatted} ETH</Mono>}
        </ModalItem>
        <ModalItemLink href={`${etherscan}/address/${account.address}`}>
          <Mono as="span">View on Etherscan</Mono>
        </ModalItemLink>
        <Divider margin="16 0" />
        {activeChain && (
          <ConnectedChain>
            <Body>Connected to {activeChain.name}</Body>
            <StatusDot status={connectedStatus} />
          </ConnectedChain>
        )}
        {connectedStatus === ConnectedStatus.WrongNetwork && (
          <ModalItemButton
            onClick={() => switchNetwork && switchNetwork(targetNetwork.id)}
          >
            Switch to {targetNetwork.name}
          </ModalItemButton>
        )}
        <ModalItemButton
          onClick={() => {
            disconnect();
            onClose();
          }}
        >
          Disconnect
        </ModalItemButton>
      </ModalContent>
    </Modal>
  ) : null;
}
