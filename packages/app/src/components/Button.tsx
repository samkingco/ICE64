import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import {
  bodyStyles,
  headingStyles,
  monoStyles,
  subheadingStyles,
} from "./Typography";
import withMargin, { WithMarginProp } from "./withMargin";

export const buttonReset = css`
  font-weight: normal;
  line-height: 1.5;
  text-decoration: none;
  text-align: center;
  color: var(--foreground);
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  transition: color 150ms ease-in-out, opacity 150ms ease-in-out;
`;

const slide = keyframes`
  0% { transform: translateX(-100%); }
	100% { transform: translateX(100%); }
`;

export const Button = styled.button`
  ${monoStyles};
  ${buttonReset};
  background: var(--foreground);
  color: var(--background);
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  &:after {
    content: "";
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: ${slide} 2.4s ease-in-out infinite;
    transition: opacity 150ms ease-in-out;
    background: linear-gradient(
      to right,
      rgba(var(--background-alpha), 0) 0%,
      rgba(var(--background-alpha), 0.24) 50%,
      rgba(var(--background-alpha), 0) 100%
    );
  }

  &:hover&:not(:disabled):after {
    opacity: 1;
  }

  &:disabled {
    background: rgba(var(--foreground-alpha), 0.04);
    color: rgba(var(--foreground-alpha), 0.48);
    cursor: not-allowed;
  }

  @media (min-width: 80rem) {
    padding: 1vw 1.5vw;
    border-radius: 1vw;
  }
`;

export const HeadingButton = styled.button`
  ${buttonReset};
  ${headingStyles};
  ${withMargin};
`;

export const SubheadingButton = styled.button`
  ${buttonReset};
  ${subheadingStyles};
  ${withMargin};
`;

interface BaseTextButtonProps extends WithMarginProp {
  subdued?: boolean;
}

export const BodyButton = styled.button<BaseTextButtonProps>`
  ${buttonReset};
  ${bodyStyles};
  ${withMargin};

  ${(p) =>
    p.subdued &&
    css`
      opacity: 0.48;
    `}

  &:hover {
    text-decoration: underline;
  }
`;

export const MonoButton = styled(BodyButton)<BaseTextButtonProps>`
  ${buttonReset};
  ${monoStyles};

  ${(p) =>
    p.subdued &&
    css`
      opacity: 0.48;
    `}

  &:hover {
    opacity: 1;
    text-decoration: none;
  }
`;
