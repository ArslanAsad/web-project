const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("reviews", ReviewSchema);
