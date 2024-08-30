import { createPublicClient, formatEther, http, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import { abi, address } from "./data.json";
const backendUrl = "https://api-testing.publicvm.com";
const CPC = 0.00001;
// Initialize public client
const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http("https://sepolia.base.org"),
});

// Create an async function to handle the contract call
const createCampaign = async ({
  walletClient,
  region,
  campaignName,
  spendingLimit,
  adCIDs,
  callerAddress,
  redirectUrl,
}) => {
  try {
    // const result = await walletClient.writeContract({
    //   abi: abi,
    //   address: "0x7ce9B26204108da8De59b3F43c98C06b732cF19e",
    //   functionName: "createCampaign",
    //   args: [region, campaignName, parseEther(spendingLimit), adCIDs],
    //   value: parseEther(spendingLimit),
    // });
    const camp_id = await publicClient.readContract({
      abi: abi,
      address: address,
      functionName: "campaignCounter",
    });
    const post_body = JSON.stringify({
      campaignId: String(Number(camp_id) - 1),
      creator: callerAddress,
      ads: JSON.stringify(adCIDs),
      redirectUrl: redirectUrl,
      campaignName: campaignName,
      region: region,
      spending_limit: Number(spendingLimit),
    });
    console.log(JSON.parse(post_body));
    const res = await fetch(`${backendUrl}/campaigns`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: post_body,
    });
    console.log(await res.json());
    // console.log("Campaign created successfully:", result);
  } catch (error) {
    console.error("Error creating campaign:", error);
  }
};

const devClaimableAmount = async (dev_address, adclicks) => {
  const claimedAmt = await publicClient.readContract({
    abi: abi,
    address: address,
    functionName: "payouts",
    args: [dev_address]
  });
  const claimableAmt = (CPC * adclicks ) - formatEther(claimedAmt);
  return claimableAmt;
};

export { createCampaign, devClaimableAmount, CPC };
