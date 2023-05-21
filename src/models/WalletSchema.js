const mongoose = require("mongoose");

const WalletSchema = mongoose.Schema({
  private: {
    type: String,
  },
  public: {
    type: String,
  },
  voteToken: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Wallet", WalletSchema);
