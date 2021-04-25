const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  followUp: {
    type: String,
    required: true,
    ref: "FollowUp",
  },
  author: {
    type: String,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", schema);
