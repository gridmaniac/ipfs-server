const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  user: {
    type: String,
    ref: "User",
    index: true,
  },
  category: {
    type: String,
    ref: "Category",
    index: true,
    required: true,
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
  isPublished: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: String,
  files: [
    {
      name: String,
      cid: String,
    },
  ],
});

module.exports = mongoose.model("Idea", schema);
