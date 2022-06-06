import { useState } from "react";
import { useAccount } from "wagmi";
import { useIsMounted } from "../hooks/useIsMounted";
import { HeadingButton } from "./Button";
import { ENSAddress } from "./ENSAddress";
import { ConnectWalletModal, WalletInfoModal } from "./WalletModals";

export function ConnectWalletButton() {
  const [isWalletInfoOpen, setIsWalletInfoOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const { data: account } = useAccount();

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return account ? (
    <>
      <HeadingButton onClick={() => setIsWalletInfoOpen(true)}>
        <ENSAddress address={account.address || ""} />
      </HeadingButton>

      <WalletInfoModal
        isOpen={isWalletInfoOpen}
        onClose={() => setIsWalletInfoOpen(false)}
      />
    </>
  ) : (
    <>
      <HeadingButton
        onClick={() => setIsConnectModalOpen(true)}
        title="Connect wallet"
      >
        Connect Wallet
      </HeadingButton>

      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </>
  );
}
