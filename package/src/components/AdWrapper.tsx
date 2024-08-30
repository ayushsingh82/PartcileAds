import React, { createContext, useContext, useState } from "react";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { useAccount } from "wagmi";
import { BlackCreateWalletButton } from "./CreateWallet";

interface AdContextType {
  region: string;
  address: string;
  dev_wallet_address: string;
}

const defaultAdContext: AdContextType = {
  region: "",
  address: "",
  dev_wallet_address: "",
};

const AdContext = createContext<AdContextType>(defaultAdContext);

export const AdWrapper = ({
  region,
  dev_wallet_address,
  children,
}: {
  region: string;
  dev_wallet_address: string;
  children: React.ReactNode;
}) => {
  const sdk = new CoinbaseWalletSDK({
    appName: "Adbase",
    appChainIds: [8453],
    appLogoUrl: "",
  });
  const [context_value, setContext_value] = useState<AdContextType | null>(
    null
  );

  const handleSuccess = (address: any) => {
    setContext_value({
      region,
      address: address as string,
      dev_wallet_address,
    });
  };

  const handleError = (error: any) => {
    console.log(error);
  };
  return (
    <div>
      {context_value ? (
        <AdContext.Provider value={context_value}>
          {children}
        </AdContext.Provider>
      ) : (
        <div>
          <BlackCreateWalletButton
            height={66}
            width={200}
            handleSuccess={handleSuccess}
            handleError = {handleError}
          />
        </div>
      )}
    </div>
  );
};

export const useAdContext = () => useContext(AdContext);
