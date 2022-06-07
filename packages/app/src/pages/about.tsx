import styled from "@emotion/styled";
import Head from "next/head";
import { Navigation } from "../components/Navigation";
import { Body, Mono, Subheading, Title } from "../components/Typography";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useOpenSeaURL } from "../hooks/useOpenSeaURL";
import { deployedAddress } from "../utils/contracts";

const Content = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;
  padding: 8rem 2vw;

  @media (min-width: 32rem) {
    padding-top: 12rem;
    padding-bottom: 12rem;
  }

  @media (min-width: 80rem) {
    padding-top: 16vw;
    padding-bottom: 16vw;
  }
`;

const MainBody = styled.div`
  max-width: 40rem;
  a {
    text-decoration: underline;
  }
  @media (min-width: 80rem) {
    max-width: 48vw;
  }
`;

const LinksAndCredits = styled.footer`
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;

  @media (min-width: 56rem) {
    grid-template-columns: 1fr 2fr;
  }
`;

export default function About() {
  const opensea = useOpenSeaURL();
  const etherscan = useEtherscanURL();

  const xqstgfx = "0xf9041442f7bf48f6b1134d332633aa853c6a0c69";

  return (
    <main>
      <Head>
        <title>About / ICE64</title>
      </Head>

      <Navigation />

      <Content>
        <MainBody>
          <Title>Iceland in winter</Title>
          <Body margin="16 0 0">
            ICE64 is a series of 16 photographs by{" "}
            <a href="https://samking.studio">Sam King</a>, documenting the
            desolate landscape of Iceland during the winter. Every image is an
            original 1 of 1 NFT, with an accompanying edition of a smaller SVG
            based artwork.
          </Body>
          <Body margin="16 0 0">
            All tokens are permanently stored on the internet. The originals
            being stored on Arweave, and the editions being stored directly on
            the Ethereum network with a custom smart contract.
          </Body>
          <Body margin="16 0 0">
            If you hold a <a href="https://roots.samking.photo">Roots NFT</a>,
            you may claim an edition of your choice, provided the Roots NFT has
            not already been used to claim, and while editions are still
            available.
          </Body>
        </MainBody>

        <LinksAndCredits>
          <div>
            <Subheading>Links</Subheading>
            <Mono>
              <a href="https://twitter.com/samkingco">Twitter</a>
            </Mono>
            <Mono>
              <a href={opensea}>OpenSea</a>
            </Mono>
            <Mono>
              <a href={`${etherscan}/address/${deployedAddress("ICE64")}`}>
                ICE64 smart contract
              </a>
            </Mono>
            <Mono>
              <a
                href={`${etherscan}/address/${deployedAddress(
                  "ICE64Renderer"
                )}`}
              >
                ICE64Renderer smart contract
              </a>
            </Mono>
            <Mono>
              <a href={`${etherscan}/address/${xqstgfx}`}>
                XQSTGFX smart contract
              </a>
            </Mono>
          </div>

          <div>
            <Subheading>Credits</Subheading>
            <Mono>
              Photography, website, and smart contracts by{" "}
              <a href="https://samking.studio">Sam King</a>.
            </Mono>
            <Mono>
              On-chain rendering smart contract (XQSTGFX) by{" "}
              <a href="https://cjpais.com/">CJ</a>.
            </Mono>
            <Mono>
              Feedback from <a href="https://www.defdao.xyz/">Def DAO</a> and{" "}
              <a href="https://twitter.com/DesirePathDAO">Desire Path</a>.
            </Mono>
          </div>
        </LinksAndCredits>

        <nav>
          <Mono subdued>
            <a href="https://samking.studio">A Sam King Studio project</a>
          </Mono>
        </nav>
      </Content>
    </main>
  );
}
