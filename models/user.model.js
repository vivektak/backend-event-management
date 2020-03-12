const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    mobile: String,
    loginOTP: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", userModel);