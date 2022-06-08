import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import {
  ConnectedStatus,
  useConnectedStatus,
} from "../hooks/useConnectedStatus";
import {
  TxState,
  useContractTransaction,
} from "../hooks/useContractTransaction";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useIsMounted } from "../hooks/useIsMounted";
import { getOriginalId } from "../utils/tokenIds";
import { Button } from "./Button";
import { LoadingIndicator } from "./LoadingIndicator";
import { RootsClaimModal } from "./RootsClaimModal";
import { Mono, Subheading } from "./Typography";
import { WalletInfoModal } from "./WalletModals";

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
  rootsPhotos: Partial<{ id: string; hasClaimedEdition: boolean }>[];
  onConfirmed?: () => void;
}

export function ClaimRootsButton({ id, onConfirmed, rootsPhotos }: Props) {
  const isMounted = useIsMounted();
  const etherscan = useEtherscanURL();

  const originalId = getOriginalId(id);
  const [showWalletInfoModal, setShowWalletInfoModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const { data: account } = useAccount();
  const { connectedStatus } = useConnectedStatus();

  const eligible = rootsPhotos.filter((i) => !i.hasClaimedEdition);

  const {
    write: claim,
    writeData: claimData,
    txState,
    errorMessage,
  } = useContractTransaction("ICE64", "claimEditionAsRootsHolder", {
    onConfirmed,
  });

  const onRootsClaimSelect = useCallback(
    (rootsId) => {
      setShowClaimModal(false);
      claim({ args: [originalId, rootsId] });
    },
    [originalId, setShowClaimModal, claim]
  );

  return (
    <>
      {txState === TxState.Confirmed &&
        connectedStatus === ConnectedStatus.Connected && (
          <Thankyou>
            <Subheading margin="-8 0 0">Claim successful</Subheading>
            <Mono subdued>Thank you!</Mono>
          </Thankyou>
        )}

      {isMounted &&
        account &&
        txState !== TxState.Confirmed &&
        connectedStatus === ConnectedStatus.Connected && (
          <ButtonWrapper>
            <Button
              onClick={() => setShowClaimModal(true)}
              disabled={[TxState.Broadcasted, TxState.WaitingOnWallet].includes(
                txState
              )}
            >
              {[TxState.Ready, TxState.Error].includes(txState) && (
                <>Claim free edition</>
              )}
              {txState === TxState.WaitingOnWallet && <>Confirming in wallet</>}
              {txState === TxState.Broadcasted && <LoadingIndicator />}
            </Button>
            <SecondaryInfo>
              {txState === TxState.Ready && (
                <Mono as="span" subdued>
                  {eligible.length} eligible Roots photo
                  {eligible.length === 1 ? "" : "s"}
                </Mono>
              )}
              {txState === TxState.WaitingOnWallet && <LoadingIndicator />}
              {txState === TxState.Broadcasted && (
                <>
                  {claimData && claimData.hash ? (
                    <a href={`${etherscan}/tx/${claimData.hash}`}>
                      <Mono as="span" subdued>
                        View transaction info
                      </Mono>
                    </a>
                  ) : (
                    <Mono as="span" subdued>
                      Sending transaction
                    </Mono>
                  )}
                </>
              )}
              {txState === TxState.Error && (
                <Mono as="span" subdued>
                  {errorMessage || "Something went wrong"}
                  {claimData && claimData.hash && (
                    <>
                      <br />
                      <a href={`${etherscan}/tx/${claimData.hash}`}>
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

      <RootsClaimModal
        originalId={originalId}
        rootsPhotos={rootsPhotos}
        onClaim={onRootsClaimSelect}
        isOpen={showClaimModal}
        onClose={() => setShowClaimModal(false)}
      />
    </>
  );
}