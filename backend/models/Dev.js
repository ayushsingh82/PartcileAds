const mongoose = require("mongoose");

const DevSchema = new mongoose.Schema({
    devAddress: {type: String, required: true},
    clicks: {type: Number, default: 0},
    zkProof: { type: String, default: "" },
});


module.exports = mongoose.model("Dev", DevSchema);
