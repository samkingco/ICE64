import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { buttonReset } from "./Button";
import { Divider } from "./Divider";
import { ENSAddress } from "./ENSAddress";
import { Modal } from "./Modal";
import { Mono, Subheading } from "./Typography";

const ModalContent = styled.div`
  width: 100%;
  background: var(--background);
  display: grid;
  grid-template-columns: 1fr;
  padding: 1rem;
  border-radius: 1.5rem;
  box-shadow: 0 1px 32px rgba(0, 0, 0, 0.08);
  @media (min-width: 80rem) {
    padding: 1vw;
    border-radius: 2vw;
  }
`;

const modalItemStyles = css`
  ${buttonReset};
  text-align: left;
  transition: background-color 150ms ease;
  border-radius: 0.5rem;
  padding: 8px 12px;
  &:hover {
    background: rgba(var(--foreground-alpha), 0.04);
    text-decoration: none;
  }
  @media (min-width: 80rem) {
    border-radius: 1vw;
    padding: 1vw 1.5vw;
  }
`;

const ModalItem = styled.div`
  padding: 8px 12px;
  min-width: 100%;

  h3 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 80rem) {
    padding: 1vw 1.5vw;
  }
`;

const ModalItemButton = styled.button`
  ${modalItemStyles};
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const ModalItemLink = styled.a`
  ${modalItemStyles};
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectWalletModal({ isOpen, onClose }: Props) {
  const { connect, connectors, isConnecting, pendingConnector } = useConnect();

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      a11yLabel="Connect your wallet"
      size="sm"
    >
      <ModalContent>
        <ModalItem>
          <Subheading>Connect wallet</Subheading>
        </ModalItem>
        {connectors.map((connector) => (
          <ModalItemButton
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => {
              connect(connector);
              onClose();
            }}
          >
            <Mono>
              {connector.name}
              {isConnecting && connector.id === pendingConnector?.id && "…"}
            </Mono>
          </ModalItemButton>
        ))}
      </ModalContent>
    </Modal>
  );
}

export function WalletInfoModal({ isOpen, onClose }: Props) {
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
    watch: true,
  });
  const { disconnect } = useDisconnect();

  return account ? (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      a11yLabel="Wallet connected options"
      size="sm"
    >
      <ModalContent>
        <ModalItem>
          <Subheading>
            <ENSAddress address={account.address || ""} />
          </Subheading>
          {balance && <Mono subdued>{balance.formatted} ETH</Mono>}
        </ModalItem>
        <ModalItem>
          <Divider />
        </ModalItem>
        <ModalItemLink href={`https://etherscan.io/address/${account.address}`}>
          <Mono>View on Etherscan</Mono>
        </ModalItemLink>
        <ModalItemButton
          onClick={() => {
            disconnect();
            onClose();
          }}
        >
          <Mono>Disconnect</Mono>
        </ModalItemButton>
      </ModalContent>
    </Modal>
  ) : null;
}
