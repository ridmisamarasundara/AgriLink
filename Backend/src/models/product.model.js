const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isSurplus: { type: Boolean, default: false },
    surplusDate: { type: Date },
    surplusDiscount: { type: Number, default: 0 }, // %

  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
