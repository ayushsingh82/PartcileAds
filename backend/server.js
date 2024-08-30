require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Campaign = require("./models/Campaign");
const Dev = require("./models/Dev");
const snarkjs = require("snarkjs");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors("*"));
app.use(bodyParser.json());

// Connect to MongoDB
const dbUri = process.env.MONGO_URI;
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Create a new campaign
app.post("/campaigns", async (req, res) => {
  const {
    campaignId,
    creator,
    ads,
    redirectUrl,
    campaignName,
    region,
    spending_limit,
  } = req.body;
  try {
    const _ads = JSON.parse(ads);
    const campaign = new Campaign({
      campaignId,
      creator,
      ads: _ads,
      redirectUrl,
      campaignName,
      region,
      spending_limit,
    });
    await campaign.save();
    res.status(201).send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all campaigns
app.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.send(campaigns);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific campaign by ID
app.get("/campaigns/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findOne({ campaignId: id });
    if (!campaign) {
      return res.status(404).send();
    }
    res.send(campaign);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Get a specific campaign by owner address
app.get("/campaigns/owner/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const campaign = await Campaign.find({ creator: address });
    if (!campaign) {
      return res.status(404).send();
    }
    res.send(campaign);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update ad clicks and aggregated zk-proof
app.patch("/campaigns/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const _campaign = await Campaign.findOne({ campaignId: id });
    const campaign = await Campaign.findByIdAndUpdate(_campaign.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!campaign) {
      return res.status(404).send();
    }
    res.send(campaign);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/randomAd", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    if (campaigns.length === 0) {
      throw new Error("No campaigns available");
    }

    // Select a random campaign
    const randomCampaignIndex = Math.floor(Math.random() * campaigns.length);
    const selectedCampaign = campaigns[randomCampaignIndex];

    // Check if the selected campaign has ads
    if (selectedCampaign.ads.length === 0) {
      throw new Error("No ads available in the selected campaign");
    }

    // Select a random ad from the selected campaign
    const randomAdIndex = Math.floor(
      Math.random() * selectedCampaign.ads.length
    );
    const selectedAd = selectedCampaign.ads[randomAdIndex];
    res.json({ ad: selectedAd, redirectUrl: selectedCampaign.redirectUrl });
  } catch (error) {
    res.status(400).send(error);
  }
});

// get dev data
app.get("/dev/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const dev = await Dev.findOne({ devAddress: address.toLowerCase() });
    if (!dev) {
      return res.status(404).send();
    }
    res.status(201).send(dev);
  } catch (error) {
    res.status(400).send(error);
  }
});

// create a dev in db
app.post("/dev", async (req, res) => {
  const { address } = req.body;
  try {
    const dev = new Dev({ devAddress: address.toLowerCase() });
    await dev.save();
    res.send(dev);
  } catch (error) {
    res.status(400).send(error);
  }
});
// create a dev in db
app.get("/devs", async (req, res) => {
  try {
    const devs = await Dev.find();
    res.send(devs);
  } catch (error) {
    res.status(400).send(error);
  }
});

// ad click
app.post("/dev/:address/adclick", async (req, res) => {
  const { address } = req.params;
  try {
    const dev = await Dev.findOneAndUpdate(
      { devAddress: address.toLowerCase() },
      { $inc: { clicks: 1 } },
      { new: true, upsert: true }
    );
    if (!dev) {
      const dev = new Dev({ devAddress: address, clicks: 1 });
      await dev.save();
      return res.status(201).send(dev);
    }
    res.send(dev);
  } catch (error) {
    res.status(400).send(error);
  }
});

// generate zk proof
app.post("/dev/:address/genproof", async (req, res) => {
  const { address } = req.params;
  try {
    const dev = await Dev.findOne({ devAddress: address.toLowerCase() });
    const input = {
      devAddress: 1,
      clicks: dev.clicks,
    };
    const { proof, publicSignals } = await snarkjs.plonk.fullProve(
      input,
      "zk/circuit_js/circuit.wasm",
      "zk/circuit_final.zkey"
    );
    const solidityCalldata = await snarkjs.plonk.exportSolidityCallData(
      proof,
      publicSignals
    );
    res.status(200).json({ proof, publicSignals, solidityCalldata });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
