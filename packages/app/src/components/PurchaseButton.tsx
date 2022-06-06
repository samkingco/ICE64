import styled from "@emotion/styled";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import {
  TxState,
  useContractTransaction,
} from "../hooks/useContractTransaction";
import { useIsMounted } from "../hooks/useIsMounted";
import { getOriginalId, isEdition } from "../utils/tokenIds";
import { Button, MonoButton } from "./Button";
import { ENSAddress } from "./ENSAddress";
import { LoadingIndicator } from "./LoadingIndicator";
import { Mono, Subheading } from "./Typography";
import { ConnectWalletModal, WalletInfoModal } from "./WalletModals";

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
  text-align: center;
  padding-bottom: 1rem;

  @media (min-width: 80rem) {
    gap: 0.75vw;
    padding-bottom: 1vw;
  }
`;

const SecondaryInfo = styled(Mono)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  @media (min-width: 80rem) {
    padding-left: 1.5vw;
    padding-right: 1.5vw;
  }
`;

const Thankyou = styled.div`
  padding: 1rem 1.5rem;
  position: relative;
  overflow: hidden;
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 80rem) {
    padding: 1vw 1.5vw;
  }
`;

interface Props {
  id: number;
  onConfirmed?: () => void;
}

export function PurchaseButton({ id, onConfirmed }: Props) {
  const isMounted = useIsMounted();
  const edition = isEdition(id);
  const originalId = getOriginalId(id);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showWalletInfoModal, setShowWalletInfoModal] = useState(false);
  const { data: account } = useAccount();

  // TODO: Update with live prices
  const price = ethers.utils.parseEther(edition ? "0.0002" : "0.0032");

  const {
    write: purchase,
    writeData: purchaseData,
    txState,
    errorMessage,
  } = useContractTransaction(
    "ICE64",
    edition ? "purchaseEdition" : "purchaseOriginal",
    {
      args: [originalId],
      overrides: { value: price },
      onConfirmed,
    }
  );

  return (
    <>
      {isMounted && !account && (
        <ButtonWrapper>
          <Button
            key="connect_button"
            onClick={() => setShowConnectModal(true)}
          >
            Connect wallet
          </Button>
          {price && (
            <SecondaryInfo>
              <Mono subdued>{ethers.utils.formatEther(price)} ETH</Mono>
            </SecondaryInfo>
          )}
        </ButtonWrapper>
      )}

      {txState === TxState.Confirmed && (
        <Thankyou>
          <Subheading margin="-8 0 0">Purchase successful</Subheading>
          <Mono subdued>Thank you!</Mono>
        </Thankyou>
      )}

      {isMounted && account && txState !== TxState.Confirmed && (
        <ButtonWrapper>
          <Button
            onClick={() => purchase()}
            disabled={[TxState.Broadcasted, TxState.WaitingOnWallet].includes(
              txState
            )}
          >
            {[TxState.Ready, TxState.Error].includes(txState) && (
              <>
                Buy
                <Mono as="span" subdued>
                  {" "}
                  &bull; {ethers.utils.formatEther(price)} ETH
                </Mono>
              </>
            )}
            {txState === TxState.WaitingOnWallet && <>Confirming in wallet</>}
            {txState === TxState.Broadcasted && <LoadingIndicator />}
          </Button>
          <SecondaryInfo>
            {txState === TxState.Ready && (
              <MonoButton onClick={() => setShowWalletInfoModal(true)} subdued>
                Connected as <ENSAddress address={account.address || ""} />
              </MonoButton>
            )}
            {txState === TxState.WaitingOnWallet && <LoadingIndicator />}
            {txState === TxState.Broadcasted && (
              <>
                {purchaseData && purchaseData.hash ? (
                  <a href={`https://etherscan.io/tx/${purchaseData.hash}`}>
                    <Mono subdued>View transaction info</Mono>
                  </a>
                ) : (
                  <Mono subdued>Sending transaction</Mono>
                )}
              </>
            )}
            {txState === TxState.Error && (
              <Mono subdued>
                {errorMessage || "Something went wrong"}
                {purchaseData && purchaseData.hash && (
                  <>
                    <br />
                    <a href={`https://etherscan.io/tx/${purchaseData.hash}`}>
                      <Mono as="span" subdued>
                        View transaction info
                      </Mono>
                    </a>
                  </>
                )}
              </Mono>
            )}
          </SecondaryInfo>
        </ButtonWrapper>
      )}

      <WalletInfoModal
        isOpen={showWalletInfoModal}
        onClose={() => setShowWalletInfoModal(false)}
      />

      <ConnectWalletModal
        isOpen={showConnectModal}
        onClose={() => setShowConnectModal(false)}
      />
    </>
  );
}
