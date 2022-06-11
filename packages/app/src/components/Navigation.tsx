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

const LogoNav = styled.header`
  ${baseNavStyle};
  top: 0;
  left: 0;
  padding-right: 12vw;
`;

const AboutNav = styled.nav`
  ${baseNavStyle};
  bottom: 0;
  right: 0;
  padding-top: 8vw;
  padding-left: 12vw;
`;

const ConnectNav = styled.nav`
  ${baseNavStyle};
  top: 0;
  right: 0;
  padding-left: 12vw;
  &,
  & button {
    text-align: right;
  }
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
  const isAbout = router.pathname === "/about";

  return (
    <>
      <LogoNav onMouseEnter={onNavMouseEnter} onMouseLeave={onNavMouseLeave}>
        <Link href="/">
          <a>
            <Heading>ICE64</Heading>
          </a>
        </Link>
      </LogoNav>

      <AboutNav onMouseEnter={onNavMouseEnter} onMouseLeave={onNavMouseLeave}>
        {isAbout ? (
          <Heading subdued>About</Heading>
        ) : (
          <Link href="/about">
            <a>
              <Heading>About</Heading>
            </a>
          </Link>
        )}
      </AboutNav>

      <ConnectNav onMouseEnter={onNavMouseEnter} onMouseLeave={onNavMouseLeave}>
        <ConnectWalletButton />
      </ConnectNav>
    </>
  );
}
