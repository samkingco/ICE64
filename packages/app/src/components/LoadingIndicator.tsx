import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import withMargin, { WithMarginProp } from "./withMargin";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIndicator = styled.span<WithMarginProp>`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  position: relative;
  ${withMargin};

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 100%;
    border-top: 2px solid rgba(var(--foreground-alpha), 0.48);
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    border-right: 2px solid transparent;
    animation: ${rotate} 650ms ease-in-out infinite;
  }

  @media (min-width: 80rem) {
    width: 1vw;
    height: 1vw;
  }
`;

export const LoadingIndicatorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
