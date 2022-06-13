import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { LoadingIndicatorWrapper } from "../components/LoadingIndicator";
import { Ellipsis2, Mono } from "../components/Typography";
import { graphQlClient } from "../graphql/client";
import { useCollectorsQuery } from "../graphql/subgraph";
import { useENS } from "../hooks/useENS";
import { getIsEdition, getOriginalId } from "../utils/tokenIds";
import { CollectorModal } from "./CollectorModal";

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
`;

export default function Collectors() {
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

  const [collectorModal, setCollectorModal] = useState("");
  const collector = collectors.find((i) => i.address === collectorModal);
  const originalIds =
    (collector && collector.originals.map((i) => parseInt(i.id, 10))) || [];
  const editionIds =
    (collector && collector.editions.map((i) => parseInt(i.id, 10))) || [];

  if (isLoading) {
    return (
      <LoadingIndicatorWrapper>
        <LoadingIndicatorWrapper />
      </LoadingIndicatorWrapper>
    );
  }

  return (
    <>
      {originalHolders.length > 0 && !isLoading && (
        <section>
          <Mono subdued margin="0 0 24">
            Originals
          </Mono>
          <Grid>
            {originalHolders.map((collector) => (
              <GridItem
                key={collector.address}
                onClick={() => setCollectorModal(collector.address)}
              >
                <Owner
                  address={collector.address}
                  originals={parseInt(collector.originalsCount, 10)}
                  editions={parseInt(collector.editionsCount, 10)}
                  fallbackId={
                    (collector.originals[0] && collector.originals[0].id) ||
                    (collector.editions[0] && collector.editions[0].id)
                  }
                />
              </GridItem>
            ))}
          </Grid>
        </section>
      )}

      {editionsHolders.length > 0 && !isLoading && (
        <section>
          <Mono subdued margin="0 0 24">
            Editions
          </Mono>
          <Grid>
            {editionsHolders.map((collector) => (
              <GridItem
                key={collector.address}
                onClick={() => setCollectorModal(collector.address)}
              >
                <Owner
                  address={collector.address}
                  originals={parseInt(collector.originalsCount, 10)}
                  editions={parseInt(collector.editionsCount, 10)}
                  fallbackId={
                    (collector.originals[0] && collector.originals[0].id) ||
                    (collector.editions[0] && collector.editions[0].id)
                  }
                />
              </GridItem>
            ))}
          </Grid>
        </section>
      )}

      <CollectorModal
        isOpen={Boolean(collectorModal)}
        onClose={() => setCollectorModal("")}
        address={collectorModal}
        originalIds={originalIds}
        editionIds={editionIds}
      />
    </>
  );
}

const Avatar = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  background: rgba(var(--foreground-alpha), 0.1);

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 80rem) {
    border-radius: 0.5vw;
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
