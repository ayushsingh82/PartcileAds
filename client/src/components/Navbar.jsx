import React from "react";
import { BlackCreateWalletButton } from "../BlackCreateWalletButton";
import { CoinbaseWalletLogo } from "../CoinbaseWalletLogo";
import { useAccount } from "wagmi";

const gradientStyle = {
  background:
    "linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)",
  height: "4px",
  width: "100%",
  border: "none",
};

function Navbar() {
  const { address, isConnected } = useAccount();
  return (
    <navbar className="sticky top-0 z-50">
      <div className="flex flex-row mx-auto px-[40px] py-[20px] justify-between items-center mt-[0px] bg-black ">
        <div className="flex flex-row items-center flex-start font-bold text-2xl text-purple-400">
          <img src="logo.png" className="w-[80px] h-[80px] filter-invert"/>
          <a href="/">Merlin-Ads</a>
        </div>
        <div className="flex items-center space-x-8">
        <h1 className="font-medium text-xxl text-white">
        <a href="/pwr">PWR</a>
      </h1>
          <h1 className="font-medium text-xxl text-white">
            <a href="/dashboard">Dev Dashboard</a>
          </h1>
          <h1 className="font-medium text-xxl text-white">
            <a href="/landing">Campaigns</a>
          </h1>
          <div className="text-white">
           Wallet
          </div>
        </div>
      </div>
      <div style={gradientStyle} />
    </navbar>
  );
}

export default Navbar;

// <h1 className='text-white'>coinbaseWallet</h1>
