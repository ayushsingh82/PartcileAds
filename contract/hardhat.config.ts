import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { vars } from "hardhat/config";
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    "BaseSepolia": {
      url: `https://base-sepolia.g.alchemy.com/v2/${vars.get("ALCHEMY_PRIVATE_KEY")}`,
      accounts: [vars.get("PRIVATE_KEY")]
    }
  }
};

export default config;
