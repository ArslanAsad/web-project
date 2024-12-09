const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: { type: String, default: "Processing" },
  // Add more fields as needed
});

module.exports = mongoose.model("orders", OrderSchema);
