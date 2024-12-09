const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  paymentMethod: String,
  transactionId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("payments", PaymentSchema);
