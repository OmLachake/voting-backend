const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    VoterHash: { type: String, required: true },
    TransactionKey: { type: String, required: true },
    RingData: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
