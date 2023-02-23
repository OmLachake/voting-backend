const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    WalletID: { type: String },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    status: {
      type: String,
      enum: ["missed", "incomplete", "completed", "invalid"],
      default: "incomplete",
    },
    isVerified: { type: Boolean, default: false },
    password: { type: String, required: true, min: 6 },
    loginId: { type: String, requird: true },
    elections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Election" }],
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
  },
  {
    timestamps: true,
  }
);

// VoterSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   bcrypt.hash(this.password, 10, (err, hash) => {
//     if (err) {
//       return next(err);
//     }
//     this.password = hash;
//     next();
//   });
// });

VoterSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("Voter", VoterSchema);
