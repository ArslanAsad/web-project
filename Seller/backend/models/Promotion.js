const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validFrom: Date,
  validTo: Date,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

module.exports = mongoose.model("promotions", PromotionSchema);
