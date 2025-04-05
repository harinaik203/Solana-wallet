"use client";

// Import wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

// Dynamically import the WalletModalProvider to avoid SSR issues
const WalletModalProviderDynamic = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletModalProvider),
  { ssr: false }
);

type Props = {
  children: React.ReactNode;
};

const WalletContextProvider = ({ children }: Props) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProviderDynamic>{children}</WalletModalProviderDynamic>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;
