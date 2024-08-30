import { expect } from "chai";
import hre from "hardhat";
import { AdBase } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

const proof: any =
  "0x1f9ea4d94943e2d715b624266e57d41baf2a42831d2fed017f82fbf18abfe42d203c1b775d355ad40a070e22a84b3c3b79f58d294f1eea64689935ea758d17322478c86466ccca773160a8a48632b074621673bd7a362ee47a91b2512d1312d0013060fb13fbeaf3281d407904148e079f785bd8730e78d543775c39e0399f9d21eaa54e2ca713325b903a14eab6843deef9627c906f4d499a35c49199f2efe901879d9daebfce73d55e299a9e69075f2904264d3e4eb4464867b6f1f561b9e906917c887ebb482e29ff82876fee7d45f10b8578cd3e56aed66c562d7ce6dfdc260ae203b347fceb7d0df5b53c6f360c99d91922653f407875ff535c25b6a4901bf9f97ba4efd5c00d46159e2d22cb3ce8202f0e6de196c6c012a1a25e4046c11ce2e3a2c588cab3e156257900ec6d7102b02b8f664ff7a3b3ad241ff3cd8be922a462f9e25724327c862142a1c9dab9f71a45990bff29aade662144fb6211112e562b747b5600306bc46e5df1e7d5841796855592f3ffde3ce02941dd75c37c2f864b55a69bf3913deb60c2b3f4f79e0442447d83bd6e36d63355309d2651b31bf95960e8d22f048616303d0ef698c9560ee273aa9315a5e5d353269025406f29de9540e25625f4403e94986c6fbd273a56f138b54f9fc83fab3d2931e7e0531c038366f2ae011337cf93eb84366803c750a35022798aa89caa245af86d2da61b270872c0dfccf3587d152830f5177ae90901dce74bbb743d52ed60300e0dcc09df33e8f22dfa005cb3da520d28c7ffcd7d77afa071a63971fa3393f3f439ed0a7a2b4c090bd292ce213806e0986230c91ebda89ab83088fa71c81883dce36616b7fd05d3caa1500ef419e8ae1eb08b41391b4b2c3b5381fd1caefb9a190bf004bde64cac4d88d4b5fa1b6d78713f649175693cf2128bc3893b223d3db4695c114127308d211533b9ae8733cd428f7a0659f15787adb5d212964731798f649a0b1e7e8d6ec012ac4c7f21aeb97f154faa742d1be0cfa6379944f36f428526d01164ca02147ce1150bb57979ba12035a59f69641e4ff16bc5b69ef2b42ed08cd22b562193b5f126e8c78fc6208109326d51535e869eccb02a1b5e41e5d18a988";

const pubsig = ["0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000001","0x0000000000000000000000000000000000000000000000000000000000000006"];
describe("Adbase", function () {
  async function setupFixture() {
    const [owner, c1, d1] = await hre.ethers.getSigners();
    let verifier = await hre.ethers.deployContract("PlonkVerifier");
    let adbase = await hre.ethers.deployContract("AdBase", [
      owner.address,
      await verifier.getAddress(),
    ]);
    return { adbase, owner, c1, d1 };
  }
  it("Should set right owner", async function () {
    const { adbase, owner } = await loadFixture(setupFixture);
    expect(await adbase.org()).to.equal(owner.address);
  });
  it("Should create campaign", async function () {
    const { adbase, owner, c1 } = await loadFixture(setupFixture);
    await adbase
      .connect(c1)
      .createCampaign(
        "asia-1",
        
        "some_camp",
        hre.ethers.parseEther("1"),
        ["abc", "def"],
        { value: hre.ethers.parseEther("1") }
      );
    expect((await adbase.campaigns(0)).creator).to.equal(c1.address);
  });
  it("Should verify proof and transfer amount to dev", async function () {
    const { adbase, owner, d1, c1 } = await loadFixture(setupFixture);
    await adbase
      .connect(c1)
      .createCampaign(
        "asia-1",
        "some_camp",
        hre.ethers.parseEther("1"),
        ["abc", "def"],
        { value: hre.ethers.parseEther("1") }
      );
    await adbase
      .connect(owner)
      .payout(d1.address, hre.ethers.parseEther("0.1"), proof, pubsig);
    expect(await adbase.payouts(d1.address)).to.equal(
      hre.ethers.parseEther("0.1")
    );
  });
});
