import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { ethers } from "ethers";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { addressDisplayName } from "../hooks/useENS";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useMarketplaceTokenURL } from "../hooks/useMarketplaceUrl";
import { usePhotoPagination } from "../hooks/usePhotoPagination";
import {
  hasClaimableRoots,
  usePurchaseMachine,
} from "../machines/purchaseMachine";
import {
  deployedAddress,
  ice64Settings,
  targetNetwork,
} from "../utils/contracts";
import { firstParam } from "../utils/firstParam";
import { gatewayURL } from "../utils/metadata";
import { getEditionId, getIsEdition, getOriginalId } from "../utils/tokenIds";
import { Button, MonoButton } from "./Button";
import { CopyToClipboard } from "./CopyToClipboard";
import { Divider } from "./Divider";
import { ENSAddress } from "./ENSAddress";
import { scrollable } from "./GlobalStyle";
import { LoadingIndicator, LoadingIndicatorWrapper } from "./LoadingIndicator";
import { RootsClaimModal } from "./RootsClaimModal";
import SocialMeta from "./SocialMeta";
import { Tabs } from "./Tabs";
import { Body, Mono, Subheading, Title } from "./Typography";
import { ConnectWalletModal, WalletInfoModal } from "./WalletModals";

const Container = styled.article`
  display: grid;
  grid-template-areas: "image" "sidebar";
  grid-template-rows: 100vw max-content;
  grid-template-columns: 1fr;
  background: var(--background);

  @media (min-width: 40rem) {
    grid-template-rows: 70vh max-content;
  }

  @media (min-width: 64rem) {
    height: 100vh;
    grid-template-areas: "image sidebar";
    grid-template-columns: 1fr 40vw;
    grid-template-rows: 1fr;
  }

  @media (min-width: 80rem) {
    grid-template-columns: 1fr 30vw;
  }
`;

const Sidebar = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-area: sidebar;
  padding: 4vw 4vw 6vw;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  ${scrollable};

  @media (min-width: 64rem) {
    max-width: none;
    padding: 1vw 1vw 2vw;
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 1rem;
  align-items: baseline;
`;

const Pagination = styled.nav`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 1rem;
  align-items: baseline;
`;

const CloseLink = styled.a`
  opacity: 0.48;
  &:hover {
    opacity: 1;
    text-decoration: none;
  }
`;

const MainContent = styled.div`
  flex: 1;
  margin-bottom: 3rem;
`;

const Description = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 80em) {
    gap: 1.5vw;
  }
`;

const FooterLinks = styled.footer`
  display: flex;
  gap: 0.5rem;
`;

const slide = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(-100%); }
	100% { transform: translateX(100%); }
`;

const SaleInfoArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--background-emphasis);
  border-radius: 1rem;
  min-width: 100%;
  min-height: 6.4rem;

  & > * {
    flex: 1;
  }

  @media (min-width: 80rem) {
    border-radius: 1vw;
    min-height: 6.8vw;
  }
`;

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

const InfoShimmer = styled.div`
  padding: 1.5rem 1.5rem;
  position: relative;
  overflow: hidden;
  min-width: 0;
  height: 100%;

  @media (min-width: 80rem) {
    padding: 1.25vw 1.5vw;
  }

  h3 {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:after {
    content: "";
    top: 0;
    left: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    pointer-events: none;
    animation: ${slide} 4s ease-in-out infinite;
    background: linear-gradient(
      to right,
      rgba(var(--background-alpha), 0) 0%,
      rgba(var(--background-alpha), 0.6) 50%,
      rgba(var(--background-alpha), 0) 100%
    );
  }
`;

const ClaimButtonWrapper = styled.div`
  border-bottom: 1px solid rgba(var(--foreground-alpha), 0.04);
  padding-bottom: 1vw;
  margin-bottom: 1vw;
`;

const ContractInfo = styled.dl`
  display: grid;
  grid-template-columns: 1fr max-content;
`;

const ContractKey = styled(Mono)`
  opacity: 0.48;
`;

const ContractValue = styled(Mono)`
  text-align: right;
`;

const UnorderedList = styled.ul`
  list-style: square;
  margin: 0;
  padding: 0;
  padding-left: 1.75rem;
  li {
    margin-top: 0.25rem 0;
    @media (min-width: 80rem) {
      margin-top: 0.25vw;
    }
  }
`;

const MediaWrapper = styled.div`
  grid-area: image;
  padding: 1vw;
`;

const Media = styled(motion.div)`
  position: relative;
  height: 100%;
`;

interface Props {
  onClose?: () => void;
  closeHref?: string;
}

export function PhotoDetail({ onClose, closeHref }: Props) {
  const router = useRouter();
  const idStr = firstParam(router.query.id) || "1";
  const id = parseInt(idStr, 10);

  const originalId = getOriginalId(id);
  const editionId = getEditionId(id);
  const isEdition = getIsEdition(id);
  const maxEditions = ice64Settings.maxEditions;
  const price = isEdition
    ? ice64Settings.priceEdition
    : ice64Settings.priceOriginal;

  const contractAddress = deployedAddress("ICE64", targetNetwork);
  const rendererAddress = deployedAddress("ICE64Renderer", targetNetwork);

  const { activeChain, switchNetwork } = useNetwork();
  const { data: account } = useAccount();
  const wallet =
    (account && account.address && account.address.toLowerCase()) || "";

  const [state, send] = usePurchaseMachine({
    id: originalId,
    activeId: id,
    wallet,
    maxEditions,
  });

  const hasClaimsAvailable = hasClaimableRoots(state.context);

  const { goToOriginal, goToEdition, goToPrev, goToNext } = usePhotoPagination({
    id,
    closeHref,
    onClose,
  });

  const etherscan = useEtherscanURL();
  const { opensea, looksrare, gem } = useMarketplaceTokenURL(id);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showWalletInfoModal, setShowWalletInfoModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const handleTabChange = useCallback(
    (index: number) => {
      if (index === 0) goToOriginal();
      if (index === 1) goToEdition();
    },
    [goToOriginal, goToEdition]
  );

  let closeContent = null;

  const closeCross = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      aria-hidden="true"
    >
      <path
        d="M12 13.4 7.1 18.3Q6.825 18.575 6.4 18.575Q5.975 18.575 5.7 18.3Q5.425 18.025 5.425 17.6Q5.425 17.175 5.7 16.9L10.6 12L5.7 7.1Q5.425 6.825 5.425 6.4Q5.425 5.975 5.7 5.7Q5.975 5.425 6.4 5.425Q6.825 5.425 7.1 5.7L12 10.6L16.9 5.7Q17.175 5.425 17.6 5.425Q18.025 5.425 18.3 5.7Q18.575 5.975 18.575 6.4Q18.575 6.825 18.3 7.1L13.4 12L18.3 16.9Q18.575 17.175 18.575 17.6Q18.575 18.025 18.3 18.3Q18.025 18.575 17.6 18.575Q17.175 18.575 16.9 18.3Z"
        fill="currentColor"
      />
    </svg>
  );

  if (closeHref) {
    closeContent = (
      <Link href={closeHref} passHref scroll={false}>
        <CloseLink>
          <Mono aria-label="Close">{closeCross}</Mono>
        </CloseLink>
      </Link>
    );
  }

  if (onClose) {
    closeContent = (
      <MonoButton onClick={onClose} subdued aria-label="Close">
        {closeCross}
      </MonoButton>
    );
  }

  return (
    <Container key={id}>
      <SocialMeta
        title={`ICE64 #${originalId}${isEdition ? " (edition)" : ""}`}
        socialImage={`/social/og-image-${originalId}.jpg`}
      />

      <Sidebar>
        <Nav>
          <Pagination>
            <MonoButton onClick={goToPrev} subdued aria-label="Previous photo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                aria-hidden="true"
              >
                <path
                  d="M10.875 19.3 4.275 12.7Q4.125 12.55 4.062 12.375Q4 12.2 4 12Q4 11.8 4.062 11.625Q4.125 11.45 4.275 11.3L10.875 4.7Q11.15 4.425 11.562 4.412Q11.975 4.4 12.275 4.7Q12.575 4.975 12.588 5.387Q12.6 5.8 12.3 6.1L7.4 11H18.575Q19 11 19.288 11.287Q19.575 11.575 19.575 12Q19.575 12.425 19.288 12.712Q19 13 18.575 13H7.4L12.3 17.9Q12.575 18.175 12.588 18.6Q12.6 19.025 12.3 19.3Q12.025 19.6 11.6 19.6Q11.175 19.6 10.875 19.3Z"
                  fill="currentColor"
                />
              </svg>
            </MonoButton>
            <MonoButton onClick={goToNext} subdued aria-label="Next photo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                aria-hidden="true"
              >
                <path
                  d="M11.3 19.3Q11.025 19.025 11.012 18.6Q11 18.175 11.275 17.9L16.175 13H5Q4.575 13 4.287 12.712Q4 12.425 4 12Q4 11.575 4.287 11.287Q4.575 11 5 11H16.175L11.275 6.1Q11 5.825 11.012 5.4Q11.025 4.975 11.3 4.7Q11.575 4.425 12 4.425Q12.425 4.425 12.7 4.7L19.3 11.3Q19.45 11.425 19.513 11.612Q19.575 11.8 19.575 12Q19.575 12.2 19.513 12.375Q19.45 12.55 19.3 12.7L12.7 19.3Q12.425 19.575 12 19.575Q11.575 19.575 11.3 19.3Z"
                  fill="currentColor"
                />
              </svg>
            </MonoButton>
          </Pagination>
          <div>{closeContent}</div>
        </Nav>

        <div>
          <Mono subdued>ICE64</Mono>
          <Title margin="-16 auto 0">
            N<sup>o</sup> {originalId}
          </Title>
        </div>

        <MainContent>
          <Tabs
            onChange={handleTabChange}
            defaultIndex={isEdition ? 1 : 0}
            tabHeadings={["1 of 1", `Edition of ${maxEditions}`]}
            tabPanels={[
              <Description key="tab-1-of-1">
                <SaleInfoArea>
                  {["subgraphLoading", "idle"].some(state.matches) && (
                    <LoadingIndicatorWrapper>
                      <LoadingIndicator />
                    </LoadingIndicatorWrapper>
                  )}

                  {state.matches("original.owned") && (
                    <InfoShimmer>
                      <Subheading margin="-8 0 0">
                        You own this original
                      </Subheading>
                      <a href={opensea}>
                        <Mono subdued>View on OpenSea</Mono>
                      </a>
                    </InfoShimmer>
                  )}

                  {state.matches("original.sold") && (
                    <InfoShimmer>
                      <Mono subdued>Owned by</Mono>
                      <Subheading margin="-4 0">
                        <ENSAddress
                          address={state.context.subgraphData.originalOwner}
                        />
                      </Subheading>
                    </InfoShimmer>
                  )}

                  {state.matches("original.available.notConnected") && (
                    <ButtonWrapper>
                      <Button onClick={() => setShowConnectModal(true)}>
                        Connect wallet
                      </Button>
                      <SecondaryInfo>
                        <Mono subdued>
                          {ethers.utils.formatEther(price)} ETH
                        </Mono>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches(
                    "original.available.connected.wrongNetwork"
                  ) && (
                    <ButtonWrapper>
                      <Button
                        onClick={() =>
                          switchNetwork && switchNetwork(targetNetwork.id)
                        }
                      >
                        Switch to {targetNetwork.name}
                      </Button>
                      <SecondaryInfo>
                        <Mono subdued>
                          {activeChain
                            ? `Connected to ${activeChain.name}`
                            : "Wrong network selected"}
                        </Mono>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("original.available.connected.ready") && (
                    <ButtonWrapper>
                      <Button onClick={() => send("TX_SUBMIT")}>
                        Buy
                        <Mono as="span" subdued>
                          {" "}
                          &bull; {ethers.utils.formatEther(price)} ETH
                        </Mono>
                      </Button>
                      <SecondaryInfo>
                        <MonoButton
                          onClick={() => setShowWalletInfoModal(true)}
                          subdued
                        >
                          Connected as{" "}
                          <ENSAddress
                            address={(account && account.address) || ""}
                          />
                        </MonoButton>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("original.available.connected.initiated") && (
                    <ButtonWrapper>
                      <Button disabled>
                        <LoadingIndicator />
                      </Button>
                      <SecondaryInfo subdued>
                        Confirming in wallet
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("original.available.connected.broadcast") && (
                    <ButtonWrapper>
                      <Button disabled>
                        <LoadingIndicator />
                      </Button>
                      <SecondaryInfo subdued>
                        {state.context.txHash ? (
                          <a href={`${etherscan}/tx/${state.context.txHash}`}>
                            Sending transaction
                          </a>
                        ) : (
                          "Sending transaction"
                        )}
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("original.available.connected.thankyou") && (
                    <InfoShimmer>
                      <Subheading margin="-8 0 0">
                        Purchase successful
                      </Subheading>
                      <Mono subdued>Thank you!</Mono>
                    </InfoShimmer>
                  )}

                  {state.matches("original.available.connected.error") && (
                    <ButtonWrapper>
                      <Button onClick={() => send("RETRY")}>Retry</Button>
                      <SecondaryInfo>
                        <Mono as="span" subdued>
                          {state.context.errorMessage || "Something went wrong"}
                          {state.context.txHash && (
                            <>
                              <br />
                              <a
                                href={`${etherscan}/tx/${state.context.txHash}`}
                              >
                                View transaction info
                              </a>
                            </>
                          )}
                        </Mono>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}
                </SaleInfoArea>

                <div>
                  <Body>
                    An original 1 of 1 artwork documenting the desolate
                    landscape of Iceland during the winter.
                  </Body>
                  <Body margin="8 0 0">
                    Each original also comes with an on-chain edition of the
                    same photo.
                  </Body>
                </div>
              </Description>,
              <Description key="tab-editions">
                <SaleInfoArea>
                  {["subgraphLoading", "idle"].some(state.matches) && (
                    <LoadingIndicatorWrapper>
                      <LoadingIndicator />
                    </LoadingIndicatorWrapper>
                  )}

                  {state.matches("edition.owned") && (
                    <InfoShimmer>
                      <Subheading margin="-8 0 0">
                        You own this edition
                      </Subheading>
                      <a href={opensea}>
                        <Mono subdued>View on OpenSea</Mono>
                      </a>
                    </InfoShimmer>
                  )}

                  {state.matches("edition.reserved") && (
                    <InfoShimmer>
                      <Subheading margin="-8 0 0">Reserved</Subheading>
                      <Mono subdued>For buyer of original</Mono>
                    </InfoShimmer>
                  )}

                  {state.matches("edition.soldOut") && (
                    <InfoShimmer>
                      <Subheading margin="-8 0 0">Sold out</Subheading>
                      <Mono subdued>All {maxEditions} editions</Mono>
                    </InfoShimmer>
                  )}

                  {state.matches("edition.available.notConnected") && (
                    <ButtonWrapper>
                      <Button onClick={() => setShowConnectModal(true)}>
                        Connect wallet
                      </Button>
                      <SecondaryInfo>
                        <Mono subdued>
                          {ethers.utils.formatEther(price)} ETH
                        </Mono>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches(
                    "edition.available.connected.wrongNetwork"
                  ) && (
                    <ButtonWrapper>
                      <Button
                        onClick={() =>
                          switchNetwork && switchNetwork(targetNetwork.id)
                        }
                      >
                        Switch to {targetNetwork.name}
                      </Button>
                      <SecondaryInfo>
                        <Mono subdued>
                          {activeChain
                            ? `Connected to ${activeChain.name}`
                            : "Wrong network selected"}
                        </Mono>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("edition.available.connected.ready") && (
                    <ButtonWrapper>
                      <Button onClick={() => send("TX_SUBMIT")}>
                        Buy
                        <Mono as="span" subdued>
                          {" "}
                          &bull; {ethers.utils.formatEther(price)} ETH
                        </Mono>
                      </Button>
                      <SecondaryInfo>
                        {hasClaimsAvailable && (
                          <ClaimButtonWrapper>
                            <MonoButton onClick={() => setShowClaimModal(true)}>
                              Or claim with Roots
                            </MonoButton>
                          </ClaimButtonWrapper>
                        )}
                        <MonoButton
                          onClick={() => setShowWalletInfoModal(true)}
                          subdued
                        >
                          Connected as{" "}
                          <ENSAddress
                            address={(account && account.address) || ""}
                          />
                        </MonoButton>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("edition.available.connected.initiated") && (
                    <ButtonWrapper>
                      <Button disabled>
                        <LoadingIndicator />
                      </Button>
                      <SecondaryInfo subdued>
                        Confirming in wallet
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("edition.available.connected.broadcast") && (
                    <ButtonWrapper>
                      <Button disabled>
                        <LoadingIndicator />
                      </Button>
                      <SecondaryInfo subdued>
                        {state.context.txHash ? (
                          <a href={`${etherscan}/tx/${state.context.txHash}`}>
                            Sending transaction
                          </a>
                        ) : (
                          "Sending transaction"
                        )}
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}

                  {state.matches("edition.available.connected.thankyou") && (
                    <InfoShimmer>
                      <Subheading margin="-8 0 0">
                        {state.context.txType === "claim"
                          ? "Claim"
                          : "Purchase"}{" "}
                        successful
                      </Subheading>
                      <Mono subdued>Thank you!</Mono>
                    </InfoShimmer>
                  )}

                  {state.matches("edition.available.connected.error") && (
                    <ButtonWrapper>
                      <Button onClick={() => send("RETRY")}>Retry</Button>
                      <SecondaryInfo>
                        <Mono as="span" subdued>
                          {state.context.errorMessage || "Something went wrong"}
                          {state.context.txHash && (
                            <>
                              <br />
                              <a
                                href={`${etherscan}/tx/${state.context.txHash}`}
                              >
                                View transaction info
                              </a>
                            </>
                          )}
                        </Mono>
                      </SecondaryInfo>
                    </ButtonWrapper>
                  )}
                </SaleInfoArea>

                <div>
                  <Body>Each edition&mdash;</Body>
                  <UnorderedList>
                    <li>is 64x64px in size</li>
                    <li>is limited to 64 colors</li>
                    <li>has a 32px white border</li>
                    <li>is stored and rendered fully on-chain</li>
                    <li>will be around as long as Ethereum is</li>
                  </UnorderedList>
                </div>
              </Description>,
            ]}
          />

          <Divider margin="32 0" />

          <ContractInfo>
            <ContractKey as="dt">Token ID</ContractKey>
            <ContractValue as="dd">{id}</ContractValue>
            <ContractKey as="dt">Token standard</ContractKey>
            <ContractValue as="dd">ERC1155</ContractValue>
            <ContractKey as="dt">Contract</ContractKey>
            <ContractValue as="dd">
              <Link href={`${etherscan}/address/${contractAddress}`}>
                <a>{addressDisplayName(contractAddress)}</a>
              </Link>
            </ContractValue>
            {!isEdition && state.context.subgraphData.originalURI && (
              <>
                <ContractKey as="dt">Metadata</ContractKey>
                <ContractValue as="dd">
                  <a
                    href={
                      gatewayURL(state.context.subgraphData.originalURI).url
                    }
                  >
                    {gatewayURL(state.context.subgraphData.originalURI).type}
                  </a>
                </ContractValue>
              </>
            )}
            {isEdition && (
              <>
                <ContractKey as="dt">Metadata</ContractKey>
                <ContractValue as="dd">
                  <a
                    href={`${etherscan}/address/${rendererAddress}#readContract`}
                  >
                    On-chain
                  </a>
                </ContractValue>
              </>
            )}
            <ContractKey as="dt">Royalties</ContractKey>
            <ContractValue as="dd">6.4%</ContractValue>
          </ContractInfo>

          {((!isEdition && state.context.subgraphData.originalOwner) ||
            (isEdition && state.context.subgraphData.editionsSold > 0)) && (
            <FooterLinks>
              <Mono subdued>
                <a href={opensea}>OpenSea</a>
              </Mono>
              <Mono subdued>&bull;</Mono>
              <Mono subdued>
                <a href={looksrare}>LooksRare</a>
              </Mono>
              <Mono subdued>&bull;</Mono>
              <Mono subdued>
                <a href={gem}>gem.xyz</a>
              </Mono>
            </FooterLinks>
          )}

          {isEdition && state.context.subgraphData.editionOwners.length > 0 && (
            <>
              <Divider margin="32 0" />

              <div>
                <Mono>
                  Collected by {state.context.subgraphData.editionOwners.length}{" "}
                  {state.context.subgraphData.editionOwners.length === 1
                    ? "person"
                    : "people"}
                </Mono>
                <UnorderedList>
                  {state.context.subgraphData.editionOwners.map((owner) => (
                    <li key={owner}>
                      <Mono>
                        <CopyToClipboard copyText={owner}>
                          <ENSAddress address={owner} />
                        </CopyToClipboard>
                      </Mono>
                    </li>
                  ))}
                </UnorderedList>
              </div>
            </>
          )}

          <WalletInfoModal
            isOpen={showWalletInfoModal}
            onClose={() => setShowWalletInfoModal(false)}
          />

          <ConnectWalletModal
            isOpen={showConnectModal}
            onClose={() => setShowConnectModal(false)}
          />

          <RootsClaimModal
            originalId={originalId}
            rootsPhotos={state.context.subgraphData.roots}
            onClaim={(rootsId) => {
              send("TX_SUBMIT", { txType: "claim", rootsId });
              setShowClaimModal(false);
            }}
            isOpen={showClaimModal}
            onClose={() => setShowClaimModal(false)}
          />
        </MainContent>
      </Sidebar>

      <MediaWrapper>
        <AnimatePresence>
          <Media
            key={`image_${id}`}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.2 } },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Image
              key={id}
              src={
                isEdition
                  ? `/tokens/${originalId}.svg`
                  : `/tokens/${originalId}.jpg`
              }
              alt=""
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              priority
            />
          </Media>
        </AnimatePresence>
      </MediaWrapper>
    </Container>
  );
}
