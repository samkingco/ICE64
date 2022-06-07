import { css } from "@emotion/react";
import styled from "@emotion/styled";
import withMargin, { WithMarginProp } from "./withMargin";

interface BaseTextProps extends WithMarginProp {
  subdued?: boolean;
}

export const subdued = css`
  opacity: 0.48;
`;

export const titleStyles = css`
  font-family: var(--font-heading);
  font-weight: normal;
  font-size: 2.4rem;
  font-size: 3.2rem;
  @media (min-width: 80rem) {
    font-size: 4vw;
  }
`;

export const Title = styled.h1<BaseTextProps>`
  ${titleStyles};
  ${(p) => p.subdued && subdued};
  ${withMargin};
`;

export const headingStyles = css`
  font-family: var(--font-heading);
  font-weight: normal;
  font-size: 1.6rem;
  font-size: 2.4rem;
  @media (min-width: 80rem) {
    font-size: 3vw;
  }
`;

export const Heading = styled.h2<BaseTextProps>`
  ${headingStyles};
  ${(p) => p.subdued && subdued};
  ${withMargin};
`;

export const subheadingStyles = css`
  font-family: var(--font-heading);
  font-weight: normal;
  font-size: 1.4rem;
  font-size: 1.6rem;
  @media (min-width: 80rem) {
    font-size: 2vw;
  }
`;

export const Subheading = styled.h3<BaseTextProps>`
  ${subheadingStyles};
  ${(p) => p.subdued && subdued};
  ${withMargin};
`;

export const bodyStyles = css`
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  @media (min-width: 80rem) {
    font-size: 1.2vw;
  }
`;

export const Body = styled.p<BaseTextProps>`
  ${bodyStyles};
  ${(p) => p.subdued && subdued};
  ${withMargin};
`;

export const monoStyles = css`
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-transform: uppercase;
  @media (min-width: 80rem) {
    font-size: 1vw;
  }
`;

export const Mono = styled.p<BaseTextProps>`
  ${monoStyles};
  ${(p) => p.subdued && subdued};
  ${withMargin};
`;
