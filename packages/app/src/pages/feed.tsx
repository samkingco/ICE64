import styled from "@emotion/styled";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { ENSAddress } from "../components/ENSAddress";
import { LoadingIndicatorWrapper } from "../components/LoadingIndicator";
import { Navigation } from "../components/Navigation";
import SocialMeta from "../components/SocialMeta";
import { Ellipsis2, Mono, Title } from "../components/Typography";
import { graphQlClient } from "../graphql/client";
import { useActivityFeedQuery } from "../graphql/subgraph";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
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

const Grid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 32rem) {
    padding-bottom: 4.5rem;
  }

  @media (min-width: 48rem) {
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 80rem) {
    gap: 2vw;
    padding-bottom: 6vw;
  }
`;

const GridItem = styled.li`
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;
  border-top: 1px solid rgba(var(--foreground-alpha), 0.1);
  padding-top: 1rem;

  @media (min-width: 48rem) {
    padding-top: 2rem;
  }

  @media (min-width: 80rem) {
    grid-template-columns: 8vw minmax(0, 1fr);
    padding-top: 2vw;
    gap: 1.5vw;
  }
`;

const TokenImage = styled.figure`
  width: 100%;
  position: relative;
  margin: 0 auto;

  a {
    display: block;
    cursor: inherit;
  }

  @media (orientation: landscape) {
    max-width: 100vh;
  }
`;

enum TransferType {
  Transfer = "Transfer",
  Purchase = "Purchase",
  RootsClaim = "RootsClaim",
  Burn = "Burn",
}

export default function Feed() {
  const { data, isLoading } = useActivityFeedQuery(graphQlClient);
  const feed = (data && data.transfers) || [];
  const etherscan = useEtherscanURL();

  return (
    <main>
      <SocialMeta
        title="Feed | ICE64"
        description="The latest transactions and activity from ICE64."
        socialImage="/og-image-feed.png"
      />

      <Navigation />

      <Content>
        <header>
          <Title>Feed</Title>
          {feed.length > 0 && (
            <Mono subdued>Latest {feed.length} transactions</Mono>
          )}
        </header>

        {isLoading && (
          <LoadingIndicatorWrapper>
            <LoadingIndicatorWrapper />
          </LoadingIndicatorWrapper>
        )}

        {feed.length > 0 && !isLoading && (
          <Grid>
            {feed.map((tx) => (
              <GridItem key={tx.txHash}>
                <TokenImage>
                  <a href={`${etherscan}/tx/${tx.txHash}`}>
                    <Image
                      src={
                        getIsEdition(tx.tokenId)
                          ? `/tokens/${getOriginalId(tx.tokenId)}.svg`
                          : `/tokens/${tx.tokenId}.jpg`
                      }
                      width={2800}
                      height={2800}
                      layout="responsive"
                      alt=""
                    />
                  </a>
                </TokenImage>
                <div>
                  <div>
                    <Mono>
                      <Ellipsis2>
                        <span>
                          <ENSAddress address={tx.to.address} />
                        </span>
                      </Ellipsis2>
                      <Mono subdued>
                        No. {getOriginalId(tx.tokenId)}
                        {getIsEdition(tx.tokenId) && " (Edition)"}
                      </Mono>
                    </Mono>
                  </div>
                  <Mono subdued size="small" margin="8 0 0">
                    <a href={`${etherscan}/tx/${tx.txHash}`}>
                      {tx.txType === TransferType.Transfer && (
                        <>
                          Transferred from{" "}
                          <ENSAddress address={tx.from.address} />
                        </>
                      )}
                      {tx.txType === TransferType.Purchase && "Purchased"}
                      {tx.txType === TransferType.RootsClaim && (
                        <>Used Roots #{tx.rootsId}</>
                      )}
                      {tx.txType === TransferType.Burn && "Burned"}{" "}
                      {formatDistanceToNowStrict(
                        new Date(tx.timestamp * 1000),
                        {
                          addSuffix: true,
                        }
                      )}
                    </a>
                  </Mono>
                </div>
              </GridItem>
            ))}
          </Grid>
        )}
      </Content>
    </main>
  );
}
