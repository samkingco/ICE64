import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { Heading } from "./Typography";

const baseNavStyle = css`
  position: fixed;
  z-index: 10;
  padding: 1vw 2vw;
`;

const northNav = css`
  top: 0;
`;

const eastNav = css`
  right: 0;
  padding-left: 12vw;
  &,
  & button {
    text-align: right;
  }
`;

const southNav = css`
  bottom: 0;
  padding-top: 8vw;
`;

const westNav = css`
  left: 0;
  padding-right: 12vw;
`;

const NorthEastNav = styled.nav`
  ${baseNavStyle};
  ${northNav};
  ${eastNav};
`;

const NorthWestNav = styled.header`
  ${baseNavStyle};
  ${northNav};
  ${westNav};
`;

const SouthEastNav = styled.nav`
  ${baseNavStyle};
  ${southNav};
  ${eastNav};
`;

const SouthWestNav = styled.nav`
  ${baseNavStyle};
  ${southNav};
  ${westNav};
`;

interface Props {
  onNavMouseEnter?: () => void;
  onNavMouseLeave?: () => void;
}

export function Navigation({
  onNavMouseEnter = () => {},
  onNavMouseLeave = () => {},
}: Props) {
  const router = useRouter();

  return (
    <>
      <NorthWestNav
        onMouseEnter={onNavMouseEnter}
        onMouseLeave={onNavMouseLeave}
      >
        <Link href="/">
          <a>
            <Heading>ICE64</Heading>
          </a>
        </Link>
      </NorthWestNav>

      <SouthEastNav
        onMouseEnter={onNavMouseEnter}
        onMouseLeave={onNavMouseLeave}
      >
        {router.pathname === "/about" ? (
          <Heading subdued>About</Heading>
        ) : (
          <Link href="/about">
            <a>
              <Heading>About</Heading>
            </a>
          </Link>
        )}
      </SouthEastNav>

      <SouthWestNav
        onMouseEnter={onNavMouseEnter}
        onMouseLeave={onNavMouseLeave}
      >
        {router.pathname === "/feed" ? (
          <Heading subdued>Feed</Heading>
        ) : (
          <Link href="/feed">
            <a>
              <Heading>Feed</Heading>
            </a>
          </Link>
        )}
      </SouthWestNav>

      <NorthEastNav
        onMouseEnter={onNavMouseEnter}
        onMouseLeave={onNavMouseLeave}
      >
        <ConnectWalletButton />
      </NorthEastNav>
    </>
  );
}
