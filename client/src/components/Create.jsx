import React, { useState } from "react";
import { useWalletClient, useConnections, useAccount } from "wagmi";
import { createCampaign } from "../contract/interaction";
import { uploadToIPFS } from "./ipfsUpload";
import { Spinner } from "@nextui-org/react";

function Create() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    region: "",
    files: [],
    redirectUrl: "",
  });
  const [submitState, setSubmitState] = useState(0);

  const [ipfsLinks, setIpfsLinks] = useState([]);
  const { address } = useAccount();
  const connections = useConnections("https://sepolia.base.org");
  const { data: walletClient } = useWalletClient({
    connector: connections[0]?.connector,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      files: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!walletClient) {
      console.error("Wallet client is not available");
      return;
    }
    setSubmitState(1);
    const { name, price, region, files, redirectUrl } = formData;
    try {
      const ipfsUrls = [];
      for (let i = 0; i < files.length; i++) {
        const link = await uploadToIPFS(files[i]);
        console.log(link);
        ipfsUrls.push(link);
      }
      console.log(ipfsUrls);
      await createCampaign({
        walletClient,
        region,
        campaignName: name,
        spendingLimit: price,
        adCIDs: ipfsUrls,
        callerAddress: address,
        redirectUrl: redirectUrl,
      });
      setSubmitState(2);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="scroller bg-black ">
      <div className="h-screen">
        <form
          className="flex flex-col items-start ml-40 mr-40 my-5 dark mb-10 py-[50px]"
          onSubmit={handleSubmit}
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="eventName"
              className="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="eventName"
              className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Campaign Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-white-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="" className="text-black" disabled>
                [select region]
              </option>
              <option value="asia-1" className="text-black">
                asia-1
              </option>
              <option value="eu-2" className="text-black">
                eu-2
              </option>
              <option value="na-3" className="text-black">
                na-3
              </option>
            </select>
            <label
              htmlFor="region"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select Region
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="url"
              name="redirectUrl"
              id="redirectUrl"
              value={formData.redirectUrl}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Redirect URL for Ads
            </label>
          </div>

          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Spending Limit (in ETH / BTC)
            </label>
          </div>

          <div
            className=" mb-6 text-sm rounded-lg bg-transparent w-auto text-white"
            role="alert"
          >
            <span className="font-medium text-red-600">
              <b>Warning!</b>
            </span>{" "}
            The above spending limit is for one time/single campaign 🤯 😎
          </div>

          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-400"
              htmlFor="file_input"
            >
              Upload files
            </label>
            <hr className="text-gray-600" />
            <input
              type="file"
              name="files"
              required
              multiple
              onChange={handleFileChange}
              className="mt-[20px] border-2 border-transparent"
            />
            <br />
            {formData.files.length > 0 && (
              <div className="grid grid-cols-10 gap-3">
                {formData.files.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded File ${index + 1}`}
                    style={{ width: "100px", marginTop: "10px" }}
                  />
                ))}
              </div>
            )}
          </div>
          <button
            className="text-white mt-6 border border-purple-600 focus:ring-4 font-medium rounded-lg text-sm  mx-auto px-10 py-2.5 text-center bg-transparent dark:focus:ring-blue-800 "
            type="submit"
            disabled={submitState !== 0}
          >
            {submitState == 0 && <>Create Campaign</>}
            {submitState == 1 && <Spinner size="sm" color="secondary" />}
            {submitState == 2 && <>✅ Created</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Create;
