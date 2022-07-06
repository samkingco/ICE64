import styled from "@emotion/styled";
import { Navigation } from "../components/Navigation";
import SocialMeta from "../components/SocialMeta";
import { Body, Mono, Subheading, Title } from "../components/Typography";
import { useEtherscanURL } from "../hooks/useEtherscanURL";
import { useOpenSeaURL } from "../hooks/useOpenSeaURL";
import { deployedAddress } from "../utils/contracts";

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
    padding-top: 12vw;
    padding-bottom: 16vw;
    max-width: 64vw;
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
  gap: 2rem;

  @media (min-width: 56rem) {
    gap: 6rem;
    grid-template-columns: 1fr 4fr;
  }
  @media (min-width: 80rem) {
    gap: 6vw;
  }
`;

const MetaLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  a {
    opacity: 0.48;
    text-decoration: none;
    &:hover {
      opacity: 1;
    }
  }
`;

export default function About() {
  const opensea = useOpenSeaURL();
  const etherscan = useEtherscanURL();

  const xqstgfx = "0xDf01A4040493B514605392620B3a0a05Eb8Cd295";

  return (
    <main>
      <SocialMeta />

      <Navigation />

      <Content>
        <MainBody>
          <Title>Iceland endures</Title>
          <Body margin="16 0 0">
            ICE64 is a series of 16 photographs by{" "}
            <a href="https://samking.studio">Sam King</a>, documenting the
            desolate landscape of Iceland during the winter, enduring harsh yet
            beautiful conditions. Every image is an original 1 of 1 NFT, with an
            accompanying edition of a smaller SVG based artwork.
          </Body>
          <Body margin="16 0 0">
            All tokens are permanently stored on the internet. The originals
            being stored on IPFS and Arweave, and the editions being stored
            directly on the Ethereum network with a custom smart contract.
          </Body>
          <Body margin="16 0 24">
            If you hold a <a href="https://roots.samking.photo">Roots NFT</a>,
            you may claim an edition of your choice, provided the Roots NFT has
            not already been used to claim, and while editions are still
            available.
          </Body>

          <MetaLinks>
            <Mono>
              <a href="https://twitter.com/samkingco">Twitter</a>
            </Mono>
            <Mono>
              <a href={`${opensea}/collection/ice64`}>OpenSea</a>
            </Mono>
          </MetaLinks>
        </MainBody>

        <LinksAndCredits>
          <div>
            <Subheading>Contracts</Subheading>
            <Mono>
              <a
                key="ICE64_contract"
                href={`${etherscan}/address/${deployedAddress("ICE64")}`}
              >
                ICE64.sol
              </a>
            </Mono>
            <Mono>
              <a
                key="ICE64DataStore_contract"
                href={`${etherscan}/address/${deployedAddress(
                  "ICE64DataStore"
                )}`}
              >
                ICE64DataStore.sol
              </a>
            </Mono>
            <Mono>
              <a
                key="ICE64Renderer_contract"
                href={`${etherscan}/address/${deployedAddress(
                  "ICE64Renderer"
                )}`}
              >
                ICE64Renderer.sol
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
              <a
                key="XQSTGFX_contract"
                href={`${etherscan}/address/${xqstgfx}`}
              >
                ExquisiteGraphics.sol
              </a>{" "}
              by <a href="https://cjpais.com/">CJ</a>.
            </Mono>
            <Mono>
              Feedback from <a href="https://www.defdao.xyz/">Def DAO</a> and{" "}
              <a href="https://twitter.com/DesirePathDAO">Desire Path</a>.
            </Mono>
          </div>
        </LinksAndCredits>

        {/* <nav>
          <Mono subdued>
            <a href="https://samking.studio">A Sam King Studio project</a>
          </Mono>
        </nav> */}
      </Content>
    </main>
  );
}
