const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  public_key: {
    type: String,
    required: [true, "Cannot be empty."],
    unique: true,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
