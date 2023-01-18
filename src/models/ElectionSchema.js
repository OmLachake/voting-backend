const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    locations: [
      {
        locationID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Location",
          required: true,
        },
        pollingStart: { type: Date, required: true },
        pollingEnd: { type: Date, required: true },
      },
    ],
    active: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ["completed", "cancelled", "active", "scheduled"],
      default: "scheduled",
    },
    imageUrl: { type: String },
    nominationDeadline: { type: Date, required: true },
    pollingStart: { type: Date, required: true },
    pollingEnd: { type: Date, required: true },
    resultDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Election", ElectionSchema);
