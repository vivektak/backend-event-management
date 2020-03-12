const mongoose = require("mongoose");

const eventModel = mongoose.Schema(
  {
    type: String,
    image: String,
    location: String,
    date: String,
    genderAllowed: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("event", eventModel);