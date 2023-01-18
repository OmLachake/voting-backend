const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cannot be empty."],
      trim: false,
    },
    email: {
      type: String,
      required: [true, "Cannot be empty."],
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    loginId: {
      type: String,
      required: [true, "Cannot be empty."],
      trim: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Cannot be empty."],
      min: 6,
    },
    role: {
      type: String,
      enum: ["admin", "moderator"],
      required: [true, "Cannot be empty."],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
