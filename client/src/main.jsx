import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import Create from "./components/Create.jsx";
import Navbar from "./components/Navbar.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  BrowserRouter,
} from "react-router-dom";
import { Route } from "react-router-dom";
import PWRPage from "./components/PWRPage.jsx";
import Landing from "./components/Landing.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./components/Dashboard.jsx";
import { NextUIProvider } from "@nextui-org/react";
// import PWR from "./components/PWR.jsx"

// import {
//   ConnectProvider,
//   OKXConnector,
//   UnisatConnector,
//   BitgetConnector,
//   TokenPocketConnector,
//   BybitConnector,
//   WizzConnector,
//   XverseConnector
// } from '@particle-network/btc-connectkit';

// import { MerlinTestnet, Merlin, LumiBitTestnet, PolygonMumbai, BEVMTestnet, BEVM, MAPProtocolTestnet, MAPProtocol, SatoshiVMTestnet, BSquaredTestnet, AINNTestnet, Mantle, BitlayerTestnet, BotanixTestnet, PolygonzkEVMCardona  } from '@particle-network/chains';

// Assuming WagmiProvider and config are imported correctly
import { WagmiProvider } from "wagmi";
import { config } from "./wagmi.ts";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
    
      <Route path="/landing" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pwr" element={<PWRPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
 
        <NextUIProvider>
          <Navbar />
          <RouterProvider router={router} />
        </NextUIProvider>

      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);


// <ConnectProvider
// options={{
//    projectId : "63b61ba3-a706-41e2-b16c-c45bacbb793b",
//  clientKey : "c1MQa7KiUpsDPPgSbkfcJeDSmuQ8dqneyEBajBGk",
//    appId : "sICpMVRuQqm11fEx82NbPmhr8tZY482V2U5gyTSO",

//   aaOptions: {
//     accountContracts: {
//       BTC: [
//         {
//           chainIds: [MerlinTestnet.id, Merlin.id, LumiBitTestnet.id, PolygonMumbai.id, BEVMTestnet.id, BEVM.id, MAPProtocolTestnet.id, MAPProtocol.id, SatoshiVMTestnet.id],
//           version: '1.0.0',
//         },
//         {
//           chainIds: [BitlayerTestnet.id, BotanixTestnet.id, PolygonzkEVMCardona.id, BSquaredTestnet.id, Mantle.id, AINNTestnet.id],
//           version: '2.0.0',
//         },
//       ],
//     },
//   },
//   walletOptions: {
//     visible: true,
//   }
// }}
// connectors={[new UnisatConnector(), new OKXConnector(), new BitgetConnector(), new TokenPocketConnector(), new BybitConnector(), new WizzConnector(), new XverseConnector()]}
// >