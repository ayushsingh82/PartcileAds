import React, { useState, createContext } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "./Wagmi";
import { AdWrapper } from "./AdWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AdBaseProvider = ({
  region,
  dev_wallet_address,
  children,
}: {
  region: string;
  dev_wallet_address: string;
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <AdWrapper
          region={region}
          dev_wallet_address={dev_wallet_address}
          children={children}
        />
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default AdBaseProvider;
