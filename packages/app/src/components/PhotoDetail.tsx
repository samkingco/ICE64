import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { useAccount, useNetwork } from "wagmi";
import { usePhotoByIdQuery } from "../graphql/subgraph";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useIsMounted } from "../hooks/useIsMounted";
import { useOpenSeaURL } from "../hooks/useOpenSeaURL";
import { usePhotoPagination } from "../hooks/usePhotoPagination";
import { chainIdToName, deployedAddress } from "../utils/contracts";
import { getEditionId, getOriginalId, isEdition } from "../utils/tokenIds";
import { MonoButton } from "./Button";
import { Divider } from "./Divider";
import { ENSAddress } from "./ENSAddress";
import { LoadingIndicator, LoadingIndicatorWrapper } from "./LoadingIndicator";
import { PurchaseButton } from "./PurchaseButton";
import { Tabs } from "./Tabs";
import { Body, Mono, Subheading, Title } from "./Typography";

const Container = styled.article`
  display: grid;
  grid-template-areas: "image" "sidebar";
  grid-template-rows: 64vh max-content;
  grid-template-columns: 1fr;
  overflow-y: auto;
  background: var(--background);

  @media (min-width: 32rem) {
    grid-template-rows: 80vh max-content;
  }

  @media (min-width: 64rem) {
    height: 100vh;
    grid-template-areas: "image sidebar";
    grid-template-columns: 1fr 30vw;
    grid-template-rows: 1fr;
  }
`;

const Sidebar = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: var(--color-bg-alt);
  color: var(--color-fg);
  grid-area: sidebar;
  padding: 1vw 1vw 6vw;
  overflow-y: auto;

  @media (min-width: 32rem) {
    & > * {
      width: 100%;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (min-width: 64rem) {
    padding-bottom: 2vw;
    & > * {
      max-width: none;
    }
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

const TabsWrapper = styled.div`
  flex: 1;
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
  gap: 1.5rem;
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
  background: rgba(var(--foreground-alpha), 0.04);
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

const OwnedBy = styled.div`
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

  h3 {
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

const MediaWrapper = styled.div`
  grid-area: image;
  padding: 1vw;
`;

const Media = styled(motion.div)`
  position: relative;
  height: 100%;
`;

interface Props {
  id: number;
  onClose?: () => void;
  closeHref?: string;
}

export function PhotoDetail({ id, onClose, closeHref }: Props) {
  const isMounted = useIsMounted();

  const edition = isEdition(id);
  const originalId = getOriginalId(id);
  const editionId = getEditionId(id);
  const maxEditions = 32;

  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const chainName = (activeChain && chainIdToName(activeChain.id)) || "rinkeby";

  const contractAddress = deployedAddress("ICE64", chainName);
  const etherscan = useEtherscanURL();
  const opensea = useOpenSeaURL();
  const openSeaLink = `${opensea}/${contractAddress}/${id}`;

  const [photoByIdQuery, refreshQuery] = usePhotoByIdQuery({
    requestPolicy: "cache-and-network",
    variables: {
      originalId: originalId.toString(),
      editionId: editionId.toString(),
    },
  });

  const onPurchaseSuccessful = () => {
    setTimeout(() => {
      refreshQuery();
    }, 5000);
  };

  const { data: photo, fetching: isFetchingPhoto } = photoByIdQuery;

  const originalPhoto = photo && photo.originalPhoto;
  const editionPhoto = photo && photo.editionPhoto;
  const hasOriginalBeenPurchased = Boolean(originalPhoto);
  const currentOriginalOwner =
    (originalPhoto && originalPhoto.currentOwner) || null;
  const isOwnerOfOriginal =
    account &&
    account.address &&
    currentOriginalOwner &&
    account.address.toLowerCase() ===
      currentOriginalOwner.address.toLowerCase();

  const currentEditionOwners =
    (editionPhoto && editionPhoto.currentOwners) || [];
  const editionsPurchased = (editionPhoto && editionPhoto.totalPurchased) || 0;
  const lastEditionReserved = Boolean(
    !hasOriginalBeenPurchased && editionsPurchased == maxEditions - 1
  );
  const editionsSoldOut = editionsPurchased == maxEditions;

  let isOwnerOfEdition = false;
  currentEditionOwners.forEach((i) => {
    if (!account || !account.address) return;
    if (account.address.toLowerCase() === i.address.toLowerCase()) {
      isOwnerOfEdition = true;
    }
  });

  const { goToOriginal, goToEdition, goToPrev, goToNext } = usePhotoPagination({
    id,
    isEdition: edition,
    closeHref,
    onClose,
  });

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
      <path d="M12 13.4 7.1 18.3Q6.825 18.575 6.4 18.575Q5.975 18.575 5.7 18.3Q5.425 18.025 5.425 17.6Q5.425 17.175 5.7 16.9L10.6 12L5.7 7.1Q5.425 6.825 5.425 6.4Q5.425 5.975 5.7 5.7Q5.975 5.425 6.4 5.425Q6.825 5.425 7.1 5.7L12 10.6L16.9 5.7Q17.175 5.425 17.6 5.425Q18.025 5.425 18.3 5.7Q18.575 5.975 18.575 6.4Q18.575 6.825 18.3 7.1L13.4 12L18.3 16.9Q18.575 17.175 18.575 17.6Q18.575 18.025 18.3 18.3Q18.025 18.575 17.6 18.575Q17.175 18.575 16.9 18.3Z" />
    </svg>
  );

  if (closeHref) {
    closeContent = (
      <Link href={closeHref} passHref>
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
                <path d="M10.875 19.3 4.275 12.7Q4.125 12.55 4.062 12.375Q4 12.2 4 12Q4 11.8 4.062 11.625Q4.125 11.45 4.275 11.3L10.875 4.7Q11.15 4.425 11.562 4.412Q11.975 4.4 12.275 4.7Q12.575 4.975 12.588 5.387Q12.6 5.8 12.3 6.1L7.4 11H18.575Q19 11 19.288 11.287Q19.575 11.575 19.575 12Q19.575 12.425 19.288 12.712Q19 13 18.575 13H7.4L12.3 17.9Q12.575 18.175 12.588 18.6Q12.6 19.025 12.3 19.3Q12.025 19.6 11.6 19.6Q11.175 19.6 10.875 19.3Z" />
              </svg>
            </MonoButton>
            <MonoButton onClick={goToNext} subdued aria-label="Next photo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                aria-hidden="true"
              >
                <path d="M11.3 19.3Q11.025 19.025 11.012 18.6Q11 18.175 11.275 17.9L16.175 13H5Q4.575 13 4.287 12.712Q4 12.425 4 12Q4 11.575 4.287 11.287Q4.575 11 5 11H16.175L11.275 6.1Q11 5.825 11.012 5.4Q11.025 4.975 11.3 4.7Q11.575 4.425 12 4.425Q12.425 4.425 12.7 4.7L19.3 11.3Q19.45 11.425 19.513 11.612Q19.575 11.8 19.575 12Q19.575 12.2 19.513 12.375Q19.45 12.55 19.3 12.7L12.7 19.3Q12.425 19.575 12 19.575Q11.575 19.575 11.3 19.3Z" />
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

        <Divider />

        <TabsWrapper>
          <Tabs
            onChange={handleTabChange}
            defaultIndex={edition ? 1 : 0}
            tabHeadings={["1 of 1", "Edition of 32"]}
            tabPanels={[
              <Description key="tab-1-of-1">
                <SaleInfoArea>
                  {isFetchingPhoto && (
                    <LoadingIndicatorWrapper>
                      <LoadingIndicator />
                    </LoadingIndicatorWrapper>
                  )}
                  {!isFetchingPhoto && isMounted && (
                    <>
                      {currentOriginalOwner ? (
                        <>
                          {isOwnerOfOriginal ? (
                            <OwnedBy>
                              <Subheading margin="-8 0 0">
                                You own this original
                              </Subheading>
                              <a href={openSeaLink}>
                                <Mono subdued>View on OpenSea</Mono>
                              </a>
                            </OwnedBy>
                          ) : (
                            <OwnedBy>
                              <Mono subdued>Owned by</Mono>
                              <Subheading margin="-4 0">
                                <ENSAddress
                                  address={currentOriginalOwner.address}
                                />
                              </Subheading>
                            </OwnedBy>
                          )}
                        </>
                      ) : (
                        <PurchaseButton
                          id={originalId}
                          onConfirmed={onPurchaseSuccessful}
                        />
                      )}
                    </>
                  )}
                </SaleInfoArea>

                <Body>
                  Each original comes with an on-chain edition. Metadata and
                  image stored on IPFS.
                </Body>
              </Description>,
              <Description key="tab-edition-of-32">
                <SaleInfoArea>
                  {isFetchingPhoto && (
                    <LoadingIndicatorWrapper>
                      <LoadingIndicator />
                    </LoadingIndicatorWrapper>
                  )}
                  {!isFetchingPhoto && isMounted && (
                    <>
                      {isOwnerOfEdition && (
                        <OwnedBy>
                          <Subheading margin="-8 0 0">
                            You own this edition
                          </Subheading>
                          <a href={openSeaLink}>
                            <Mono subdued>View on OpenSea</Mono>
                          </a>
                        </OwnedBy>
                      )}
                      {lastEditionReserved && (
                        <OwnedBy>
                          <Subheading margin="-8 0 0">Reserved</Subheading>
                          <Mono subdued>For buyer of original</Mono>
                        </OwnedBy>
                      )}
                      {editionsSoldOut && (
                        <OwnedBy>
                          <Subheading margin="-8 0 0">Sold out</Subheading>
                          <Mono subdued>All 32 editions</Mono>
                        </OwnedBy>
                      )}
                      {!editionsSoldOut &&
                        !lastEditionReserved &&
                        !isOwnerOfEdition && (
                          <PurchaseButton
                            id={editionId}
                            onConfirmed={onPurchaseSuccessful}
                          />
                        )}
                    </>
                  )}
                </SaleInfoArea>

                {currentEditionOwners.length > 0 && (
                  <div>
                    <Mono>
                      Current owners{" "}
                      <Mono as="span" subdued>
                        ({currentEditionOwners.length})
                      </Mono>
                    </Mono>
                    {currentEditionOwners.map((owner) => (
                      <Mono key={owner.address}>
                        <ENSAddress address={owner.address} />
                      </Mono>
                    ))}
                  </div>
                )}
              </Description>,
            ]}
          />
        </TabsWrapper>

        <FooterLinks>
          <Mono subdued>
            <a href={openSeaLink}>OpenSea</a>
          </Mono>
          <Mono subdued>
            <a href={`${etherscan}/address/${contractAddress}`}>Etherscan</a>
          </Mono>
        </FooterLinks>
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
                edition
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
