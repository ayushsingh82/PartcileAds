import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useAccount } from "wagmi";

const CardWithImage = ({ campaign }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    if (!showDetails) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // Enable scrolling when modal is closed
    }
  };

  return (
    <div onClick={toggleDetails}>
      {" "}
      <Card
        className="relative py-4 bg-black text-white border border-purple-500 hover:shadow-lg hover:shadow-purple-500 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {showDetails && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-85 flex flex-col justify-center items-center p-4">
            <div className="relative bg-black rounded-lg p-4 w-full max-w-[80%] overflow-hidden border-1">
              <p className="uppercase font-bold text-2xl mb-2 text-white">
                {campaign.campaignName}
              </p>
              <hr className="border-purple-800"/>
              <h4 className="font-bold text-lg mt-2 text-white">
                Region: {campaign.region}
              </h4>
              <small className="text-white">
                Spending Limit: {campaign.spendingLimit} ETH
              </small>
              <h2 className="text-lg mt-10 mb-3">Ad Content:</h2>
              <div className="grid grid-cols-5 gap-3">
                {campaign.ads.map((ad, index) => (
                  <img src={ad} key={index} className="border border-purple-800 p-2 rounded-lg"/>
                ))}
              </div>
            </div>
          </div>
        )}
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="uppercase font-bold text-lg mb-5">
            {campaign.campaignName}
          </p>
          <small className="text-white">Region: {campaign.region}</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            alt="Card background"
            className="object-cover rounded-xl mt-4"
            src={campaign.ads[0]}
            width="auto"
          />
        </CardBody>
      </Card>
    </div>
  );
};

function Landing() {
  const { address, isConnected } = useAccount();
  const backendUrl = "https://api-testing.publicvm.com";
  const [campaigns, setCampaigns] = useState(null);

  if (!isConnected) {
    return <h1 className="text-lg m-10">Connect wallet to continue</h1>;
  }

  useEffect(() => {
    const getCampaigns = async (address) => {
      const res = await fetch(`${backendUrl}/campaigns/owner/${address}`, {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });
      const camps = await res.json();
      console.log(camps);
      setCampaigns(camps);
    };
    if (!campaigns) {
      getCampaigns(address);
    }
  }, [campaigns, address]);

  return (
    <div className="bg-black text-white h-screen scroller">
      <div className="flex items-center justify-end px-[100px] py-[30px]">
        <button className="border-2 border-purple-500 px-[20px] py-[7px] text-xl font-semibold rounded-lg bg-gradient-to-r from-purple-900 via-black to-black text-white mx-auto mt-[20px]">
          <a href="/create">+ Create Campaign</a>
        </button>
      </div>
      {campaigns ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto px-4 mt-[30px]">
          {campaigns?.map((campaign, index) => (
            <CardWithImage key={index} campaign={campaign} />
          ))}
        </div>
      ) : (
        <h1 className="text-lg m-10">No campaigns create one</h1>
      )}
    </div>
  );
}

export default Landing;
