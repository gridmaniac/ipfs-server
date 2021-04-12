const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    index: true,
  },
  profit: {
    type: String,
    required: true,
    index: true,
  },
  details: {
    type: String,
    required: true,
    index: true,
  },
  files: [
    {
      name: String,
      cid: String,
    },
  ],
});

module.exports = mongoose.model("Idea", schema);
