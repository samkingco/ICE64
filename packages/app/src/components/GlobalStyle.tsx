import { css } from "@emotion/react";

export const globalStyle = css`
  @font-face {
    font-family: "Dahlia";
    font-display: fallback;
    src: url("/fonts/Dahlia-Regular.woff") format("woff"),
      url("/fonts/Dahlia-Regular.woff2") format("woff2");
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: "Mono";
    font-display: fallback;
    src: url("/fonts/Mono.woff") format("woff"),
      url("/fonts/Mono.woff2") format("woff2");
    font-style: normal;
    font-weight: normal;
  }

  :root {
    --reach-dialog: 1;
    --foreground: rgb(0, 0, 0);
    --foreground-alpha: 0, 0, 0;
    --background: rgb(255, 255, 255);
    --background-alpha: 255, 255, 255;
    --font-heading: "Dahlia", sans-serif;
    --font-sans: system, -apple-system, "Helvetica Neue", Helvetica, "Segoe UI",
      Roboto, sans-serif;
    --font-mono: "Mono", SFMono-Regular, SF Mono, Menlo, Consolas,
      Liberation Mono, monospace;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    outline: none;
    &:focus-visible {
      outline: 1px dotted var(--foreground);
    }
  }

  html,
  body,
  body > div:first-of-type,
  div#__next {
    height: 100%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.5;
    color: var(--foreground);
    background: var(--background);
    cursor: crosshair;

    @media (min-width: 80rem) {
      font-size: 1.2vw;
    }
  }

  /* Button reset */
  button {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: 100%;
    line-height: 1.5;
    overflow: visible;
    text-transform: none;
    border: none;
    cursor: pointer;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  a {
    color: var(--foreground);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .web3modal-modal-lightbox {
    z-index: 50 !important;
    background: rgba(255, 255, 255, 0.92) !important;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
`;
