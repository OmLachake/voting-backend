const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    VoterHash: { type: String, required: true },
    TransactionKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
