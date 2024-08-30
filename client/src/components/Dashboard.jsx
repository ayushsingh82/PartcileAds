import React, { useEffect, useState } from "react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../../src/components/ui/3d-card";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { useAccount, useWriteContract } from "wagmi";
import { CPC, devClaimableAmount } from "../contract/interaction";
import ContractData from "../contract/data.json";
import { Spinner } from "@nextui-org/react";
import { privateKeyToAccount } from "viem/accounts";
import { parseEther } from "viem";
const TypewriterEffectSmoothDemo = () => {
  const words = [
    { text: "Claim" },
    { text: "Ad's" },
    { text: "Revenue.", className: "text-purple-500 dark:text-purple-500" },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem] mt-[40px]">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
};

const extractParts = (zkProof) => {
  const splitIndex = zkProof.lastIndexOf("[");
  const byteData = zkProof.substring(0, splitIndex - 1);
  const arrayData = JSON.parse(zkProof.substring(splitIndex));

  return { byteData, arrayData };
};

function Dashboard() {
  const backendUrl = "https://api-testing.publicvm.com";
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [devinfo, setDevinfo] = useState(null);
  const [claimable, setClaimable] = useState(null);
  const [popup, setPopup] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  const [proof, setProof] = useState(null);
  const [txhash, setTxhash] = useState(null);

  if (!isConnected) {
    return <h1 className="text-lg m-10">Connect wallet to continue</h1>;
  }

  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(`${backendUrl}/dev/${address}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        const claimableAmt = await devClaimableAmount(address, data.clicks);
        setClaimable(claimableAmt);
      }
      setDevinfo(data);
    };
    if (!devinfo) {
      getInfo();
    }
  }, [address, devinfo]);

  const HandleClaim = async () => {
    setCurrentState(1);
    // gen proof
    const res = await fetch(`${backendUrl}/dev/${address}/genproof`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const proof_data = await res.json();
    console.log(proof_data);
    setProof(proof_data.proof);

    const { byteData, arrayData } = extractParts(proof_data.solidityCalldata);
    const account = privateKeyToAccount(import.meta.env.VITE_PK);
    const write_res = await writeContractAsync({
      account,
      abi: ContractData.abi,
      address: ContractData.address,
      functionName: "payout",
      args: [address, parseEther(String(claimable)), byteData, arrayData],
    });
    console.log(write_res);
    setTxhash(write_res);
    setCurrentState(2);
    // use proof to call contract and claim amount
  };
  return (
    <div>
      {popup && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-85 flex flex-col justify-center items-center p-4">
          <div className="relative bg-black rounded-lg p-4 w-full max-w-[80%] max-h-[70%] overflow-scroll overflow-x-hidden border-1">
            <p className="uppercase font-bold text-2xl mb-2 text-white">
              Claim Ad Rewards
            </p>
            <hr className="border-purple-800" />
            <h2 className="mt-2 text-white">
              Current CPC [Cost Per CLick]: {CPC} ETH
            </h2>
            <h2 className="mt-2 text-white">
              Claimable Amount: {Number(claimable)} ETH
            </h2>
            {}
            <button
              className="text-white border p-3 rounded-lg border-purple-600 mt-8"
              onClick={HandleClaim}
              disabled={currentState !== 0}
            >
              {currentState == 0 && "Claim"}
              {currentState == 1 && (
                <Spinner
                  size="sm"
                  color="secondary"
                  label="Generating ZK Proof"
                  labelColor="secondary"
                />
              )}
              {currentState == 2 && "✅ Claim Success"}
            </button>
            {currentState == 2 && proof !== null && (
              <div>
                <a
                  href={`https://sepolia.basescan.org/tx/${txhash}`}
                  className="mt-4"
                >{`https://sepolia.basescan.org/tx/${txhash}`}</a>
                <p className="text-gray-400 border p-2 break-words overflow-hidden mt-4">
                  ZK-Proof: <br />
                  {JSON.stringify(proof)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-black flex flex-col items-center h-screen scroller">
        <div className="text-4xl">
          <TypewriterEffectSmoothDemo />
        </div>

        <div className="mt-8 flex flex-row items-center gap-x-12">
          <div
            className="border border-purple-500 h-[200px] w-[330px] rounded-lg flex flex-row hover:shadow-purple-500 hover:shadow-lg
    items-center justify-center hover:border-purple-500 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <div className="text-white">
              <img
                src="https://plus.unsplash.com/premium_photo-1674674741071-1e28e023ccc1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlbW9uZXl8ZW58MHx8MHx8fDA%3D"
                className="h-[60px] w-[60px]"
              />
            </div>
            <div className="text-white px-[30px] py-[5px]">
              <h1 className="font-bold text-4xl">
                {devinfo ? <>{devinfo.clicks}</> : "NA"}
              </h1>
              <p className="font-medium text-2xl">Adclicks</p>
            </div>
          </div>

          <div className="relative border border-purple-500 h-[200px] w-[330px] rounded-lg flex flex-row hover:shadow-purple-500 hover:shadow-lg items-center justify-center hover:border-purple-500 hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="text-white">
              <img
                src="https://plus.unsplash.com/premium_photo-1674674741071-1e28e023ccc1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlbW5leXxlbnwwfHx8fHx8&auto=format&fit=crop&w=800&q=60"
                className="h-[60px] w-[60px]"
              />
            </div>
            <div className="text-white px-[30px] py-[5px]">
              <h1 className="font-bold text-4xl">
                {claimable ? (
                  <>
                    {Number(claimable).toPrecision(3)}
                    <br /> ETH
                  </>
                ) : (
                  "NA"
                )}
              </h1>
              <p className="font-medium text-2xl">Claimable</p>
            </div>
            <button
              className="absolute bottom-2 right-2 px-3 py-1 rounded-lg bg-gradient-to-r from-purple-900 via-black to-black text-white"
              onClick={() => setPopup((prevValue) => !prevValue)}
            >
              Claim
            </button>
          </div>

          <div
            className="border border-purple-500 h-[200px] w-[330px] rounded-lg flex flex-row hover:shadow-purple-500 hover:shadow-lg
    items-center justify-center hover:border-purple-500 hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            <div className="text-white">
              <img
                src="https://plus.unsplash.com/premium_photo-1674674741071-1e28e023ccc1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVycGxlbW9uZXl8ZW58MHx8MHx8fDA%3D"
                className="h-[60px] w-[60px]"
              />
            </div>
            <div className="text-white px-[30px] py-[5px]">
              <h1 className="font-bold text-4xl">
                {devinfo ? (
                  <>
                    {Number(devinfo.clicks * CPC).toPrecision(3)}
                    <br /> ETH
                  </>
                ) : (
                  "NA"
                )}
              </h1>
              <p className="font-medium text-2xl">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
