const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  salePrice: Number,
  stock: { type: Number, required: true },
  category: String,
  tags: [String],
  images: [String],
  // Add more fields as needed
});

module.exports = mongoose.model("products", ProductSchema);
