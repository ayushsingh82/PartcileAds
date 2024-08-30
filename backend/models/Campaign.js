const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  campaignId: { type: String, required: true },
  campaignName: {type: String, required: true},
  region: {type: String, required: true},
  creator: { type: String, required: true },
  ads: [{ type: String }],
  redirectUrl: { type: String, required: true },
  spending_limit: { type: Number, required: true },
});

module.exports = mongoose.model("Campaign", CampaignSchema);
