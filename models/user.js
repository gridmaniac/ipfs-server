const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["inventor", "investor"],
    index: true,
  },
  paymentDetails: {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
    },
    cardNumer: {
      type: String,
      trim: true,
    },
    cardHolder: {
      type: String,
      trim: true,
    },
    expirationDate: {
      type: Date,
    },
    cardCode: {
      type: String,
    },
  },
});

module.exports = mongoose.model("User", schema);
