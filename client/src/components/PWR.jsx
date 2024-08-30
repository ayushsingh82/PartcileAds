import React, { useState, useContext, useEffect } from "react";
import PwrSvcContext from "./pwr.context";

import { 
  PWRWallet,
  PWRJS,
  TransactionDecoder,
  TransactionBuilder
} from '@pwrjs/core';

const url = 'https://pwrrpc.pwrlabs.io';
PWRJS.setRpcNodeUrl(url);

const wallet = new PWRWallet();

const privateKeyHex = "";
const pwrWallet = new PWRWallet(privateKeyHex);

const PWR = () => {
  const pwrService = useContext(PwrSvcContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pwrService) {
      pwrService.init().then(() => {
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [pwrService]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pwrService) {
    return <div>PWR service not found</div>;
  }

  async function connect() {
    try {
      await pwrService.connect();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h1>Home is YOUR_PRIVATE_KEY_HERE</h1>
      {pwrService.isConnected() ? (
        <section>
          <h1>
            Your address is
            <span style={{ color: "blue" }}>{pwrService.getAddress()}</span>
          </h1>

          <hr />

          <button onClick={() => pwrService.disconnect()}>Disconnect</button>
        </section>
      ) : (
        <section>
          <button onClick={connect}>Connect your pwr wallet</button>
        </section>
      )}
    </div>
  );
}

export default PWR;
