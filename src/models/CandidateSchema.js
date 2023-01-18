const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cannot be empty."],
      trim: false,
    },
    loginId: {
      type: String,
      required: [true, "Cannot be empty."],
      trim: true,
      unique: true,
      index: true,
    },
    WalletID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    LocationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    ElectionID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Candidate", CandidateSchema);
