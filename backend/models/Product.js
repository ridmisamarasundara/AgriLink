const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  category: {
    type: String, // fruit or vegetable
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  imageUrl: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  isSurplus: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Product", productSchema);
