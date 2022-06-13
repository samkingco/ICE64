import styled from "@emotion/styled";
import Image from "next/image";
import { LoadingIndicatorWrapper } from "../components/LoadingIndicator";
import { Navigation } from "../components/Navigation";
import SocialMeta from "../components/SocialMeta";
import { Ellipsis2, Mono, Title } from "../components/Typography";
import { graphQlClient } from "../graphql/client";
import { useCollectorsQuery } from "../graphql/subgraph";
import { useENS } from "../hooks/useENS";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useOpenSeaURL } from "../hooks/useOpenSeaURL";
import { getIsEdition, getOriginalId } from "../utils/tokenIds";

const Content = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 8rem 2vw;
  max-width: 64rem;
  margin: 0 auto;

  @media (min-width: 32rem) {
    padding-top: 12rem;
    padding-bottom: 12rem;
  }

  @media (min-width: 80rem) {
    gap: 4vw;
    max-width: 64vw;
    padding-top: 12vw;
    padding-bottom: 16vw;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 32rem) {
    /* padding-bottom: 4.5rem; */
  }

  @media (min-width: 48rem) {
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 80rem) {
    gap: 2vw;
    /* padding-bottom: 6vw; */
  }
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1.5rem;
  align-items: center;
  /* border-top: 1px solid rgba(var(--foreground-alpha), 0.1);
  padding-top: 1rem; */

  @media (min-width: 48rem) {
    /* padding-top: 2rem; */
  }

  @media (min-width: 80rem) {
    /* padding-top: 2vw; */
    gap: 1.5vw;
  }
`;

export default function Feed() {
  const { data, isLoading } = useCollectorsQuery(graphQlClient);
  const collectors = (data && data.wallets) || [];

  const sortedCollectors = collectors.sort(
    (a, b) =>
      b.originalsCount - a.originalsCount || b.editionsCount - a.editionsCount
  );

  const originalHolders = sortedCollectors.filter(
    (i) => i.originalsCount > "0"
  );
  const editionsHolders = sortedCollectors.filter(
    (i) => i.originalsCount === "0" && i.editionsCount > "0"
  );

  const opensea = useOpenSeaURL();
  const etherscan = useEtherscanURL();

  return (
    <main>
      <SocialMeta
        title="Feed | ICE64"
        description="The latest transactions and activity from ICE64."
        socialImage="/og-image-collectors.png"
      />

      <Navigation />

      <Content>
        <Title>Collectors</Title>

        {isLoading && (
          <LoadingIndicatorWrapper>
            <LoadingIndicatorWrapper />
          </LoadingIndicatorWrapper>
        )}

        {originalHolders.length > 0 && !isLoading && (
          <section>
            <Mono subdued margin="0 0 24">
              Originals
            </Mono>
            <List>
              {originalHolders.map((collector) => (
                <ListItem key={collector.address}>
                  <Owner
                    address={collector.address}
                    originals={parseInt(collector.originalsCount, 10)}
                    editions={parseInt(collector.editionsCount, 10)}
                    fallbackId={
                      (collector.originals[0] && collector.originals[0].id) ||
                      (collector.editions[0] && collector.editions[0].id)
                    }
                  />
                </ListItem>
              ))}
            </List>
          </section>
        )}

        {editionsHolders.length > 0 && !isLoading && (
          <section>
            <Mono subdued margin="0 0 24">
              Editions
            </Mono>
            <List>
              {editionsHolders.map((collector) => (
                <ListItem key={collector.address}>
                  <Owner
                    address={collector.address}
                    originals={parseInt(collector.originalsCount, 10)}
                    editions={parseInt(collector.editionsCount, 10)}
                    fallbackId={
                      (collector.originals[0] && collector.originals[0].id) ||
                      (collector.editions[0] && collector.editions[0].id)
                    }
                  />
                </ListItem>
              ))}
            </List>
          </section>
        )}
      </Content>
    </main>
  );
}

// const OwnerWrapper = styled.div`
//   display: grid;
//   grid-template-columns: 3rem 1fr max-content;
//   grid-gap: 1rem;
//   @media (min-width: 80rem) {
//     grid-template-columns: 3vw 1fr max-content;
//     grid-gap: 1vw;
//   }
// `;

const Avatar = styled.div`
  border-radius: 1rem;
  background: rgba(var(--foreground-alpha), 0.1);
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (min-width: 80rem) {
    width: 4vw;
    height: 4vw;
    border-radius: 1vw;
  }
`;

interface OwnerProps {
  address: string;
  originals: number;
  editions: number;
  fallbackId?: string;
}

function Owner({
  address,
  originals = 0,
  editions = 0,
  fallbackId,
}: OwnerProps) {
  const { displayName, avatar } = useENS(address || "");
  const ownedText = [
    originals > 0
      ? `${originals} original${originals !== 1 ? "s" : ""}`
      : undefined,
    editions > 0
      ? `${editions} edition${editions !== 1 ? "s" : ""}`
      : undefined,
  ]
    .filter((i) => i !== undefined)
    .join(" • ");

  const fallback = parseInt(fallbackId || "0", 0);
  return (
    <>
      <Avatar>
        {avatar ? (
          <img src={avatar} width="64" height="64" alt="" />
        ) : fallbackId ? (
          <Image
            src={
              getIsEdition(fallback)
                ? `/tokens/${getOriginalId(fallback)}-borderless.svg`
                : `/tokens/${fallback}.jpg`
            }
            width={2800}
            height={2800}
            layout="responsive"
            alt=""
          />
        ) : null}
      </Avatar>
      <div>
        <Mono>
          <Ellipsis2>
            <span>{displayName}</span>
          </Ellipsis2>
        </Mono>
        <Mono subdued size="small">
          {ownedText}
        </Mono>
      </div>
    </>
  );
}
