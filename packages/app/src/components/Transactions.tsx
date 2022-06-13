import styled from "@emotion/styled";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { graphQlClient } from "../graphql/client";
import { useActivityFeedQuery } from "../graphql/subgraph";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { getIsEdition, getOriginalId } from "../utils/tokenIds";
import { ENSAddress } from "./ENSAddress";
import { LoadingIndicatorWrapper } from "./LoadingIndicator";
import { Ellipsis2, Mono } from "./Typography";

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
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 80rem) {
    gap: 1vw;
    padding-bottom: 6vw;
  }
`;

const GridItem = styled.li`
  a {
    display: grid;
    grid-template-columns: 6rem minmax(0, 1fr);
    gap: 1.5rem;
    align-items: center;
    padding: 1rem;
    border-radius: 1.5rem;
    border: 1px solid rgba(var(--foreground-alpha), 0.04);
    transition: border 150ms ease-in-out, background-color 150ms ease-in-out;

    &:hover {
      border-color: transparent;
      background: rgba(var(--foreground-alpha), 0.04);
      text-decoration: none;
    }

    @media (min-width: 80rem) {
      padding: 1vw;
      grid-template-columns: 6vw minmax(0, 1fr);
      gap: 1.5vw;
      border-radius: 1.5vw;
    }
  }
`;

const TokenImage = styled.figure`
  width: 100%;
  position: relative;
  margin: 0 auto;
  border-radius: 0.5rem;
  overflow: hidden;

  a {
    display: block;
    cursor: inherit;
  }

  @media (min-width: 80rem) {
    border-radius: 0.5vw;
  }
`;

enum TransferType {
  Transfer = "Transfer",
  Purchase = "Purchase",
  RootsClaim = "RootsClaim",
  Burn = "Burn",
}

export default function Transactions() {
  const { data, isLoading } = useActivityFeedQuery(graphQlClient);
  const feed = (data && data.transfers) || [];
  const etherscan = useEtherscanURL();

  if (isLoading) {
    return (
      <LoadingIndicatorWrapper>
        <LoadingIndicatorWrapper />
      </LoadingIndicatorWrapper>
    );
  }

  if (feed.length === 0) {
    return <Mono subdued>No transactions</Mono>;
  }

  return (
    <Grid>
      {feed.map((tx) => (
        <GridItem key={tx.txHash}>
          <a
            target="_blank"
            rel="noreferrer"
            href={`${etherscan}/tx/${tx.txHash}`}
          >
            <TokenImage>
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
            </TokenImage>
            <div>
              <div>
                <Mono>
                  <Ellipsis2>
                    <span>
                      <ENSAddress address={tx.to.address} />
                    </span>
                  </Ellipsis2>
                  <Mono subdued as="span">
                    No. {getOriginalId(tx.tokenId)}
                    {getIsEdition(tx.tokenId) && " (Edition)"}
                  </Mono>
                </Mono>
              </div>
              <Mono subdued size="small" margin="8 0 0">
                {tx.txType === TransferType.Transfer && (
                  <>
                    Transferred from <ENSAddress address={tx.from.address} />
                  </>
                )}
                {tx.txType === TransferType.Purchase && "Purchased"}
                {tx.txType === TransferType.RootsClaim && (
                  <>Used Roots #{tx.rootsId}</>
                )}
                {tx.txType === TransferType.Burn && "Burned"}{" "}
                {formatDistanceToNowStrict(new Date(tx.timestamp * 1000), {
                  addSuffix: true,
                })}
              </Mono>
            </div>
          </a>
        </GridItem>
      ))}
    </Grid>
  );
}
