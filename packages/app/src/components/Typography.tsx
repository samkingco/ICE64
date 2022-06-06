import { css } from "@emotion/react";
import styled from "@emotion/styled";
import withMargin, { WithMarginProp } from "./withMargin";

export const titleStyles = css`
  font-family: var(--font-heading);
  font-weight: normal;
  font-size: 2.4rem;
  @media (min-width: 32rem) {
    font-size: 3.2rem;
  }
  @media (min-width: 80rem) {
    font-size: 4vw;
  }
`;

export const Title = styled.h1`
  ${titleStyles};
  ${withMargin};
`;

export const headingStyles = css`
  font-family: var(--font-heading);
  font-weight: normal;
  font-size: 1.6rem;
  @media (min-width: 32rem) {
    font-size: 2.4rem;
  }
  @media (min-width: 80rem) {
    font-size: 3vw;
  }
`;

export const Heading = styled.h2`
  ${headingStyles};
  ${withMargin};
`;

export const subheadingStyles = css`
  font-family: var(--font-heading);
  font-weight: normal;
  font-size: 1.4rem;
  @media (min-width: 32rem) {
    font-size: 1.6rem;
  }
  @media (min-width: 80rem) {
    font-size: 2vw;
  }
`;

export const Subheading = styled.h3`
  ${subheadingStyles};
  ${withMargin};
`;

interface BaseTextProps extends WithMarginProp {
  subdued?: boolean;
}

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
  ${withMargin};
  ${(p) =>
    p.subdued &&
    css`
      opacity: 0.64;
    `}
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
  ${withMargin};
  ${(p) =>
    p.subdued &&
    css`
      opacity: 0.48;
    `}
`;
