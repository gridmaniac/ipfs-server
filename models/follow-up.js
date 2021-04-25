const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  inventor: {
    type: String,
    required: true,
    ref: "User",
  },
  investor: {
    type: String,
    required: true,
    ref: "User",
  },
  idea: {
    type: String,
    required: true,
    ref: "Idea",
  },
  isStarted: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FollowUp", schema);
