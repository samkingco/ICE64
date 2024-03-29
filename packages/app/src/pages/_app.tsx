import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { globalStyle } from "../components/GlobalStyle";
import { targetNetwork } from "../utils/contracts";

const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [chain[targetNetwork.name]],
  [
    alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
    infuraProvider({ infuraId: process.env.NEXT_PUBLIC_INFURA_KEY }),
    publicProvider(),
  ]
);

const wagmiClient = createClient({
  autoConnect: true,

  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "MetaMask",
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        <Global styles={globalStyle} />
        <Script
          defer
          data-domain="ice64.com"
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiConfig>
  );
}
