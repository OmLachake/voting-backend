const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
    locations: [
      {
        locationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Location",
          required: true,
        },
        pollingStart: { type: Date },
        pollingEnd: { type: Date },
      },
    ],
    active: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ["completed", "cancelled", "active", "scheduled"],
      default: "scheduled",
    },
    imageUrl: { type: String },
    nominationDeadline: { type: String },
    pollingStart: { type: String },
    pollingEnd: { type: String },
    resultDate: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Election", ElectionSchema);
