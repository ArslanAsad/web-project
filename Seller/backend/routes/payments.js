const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

router.get("/", auth, async (req, res) => {
  try {
    console.log("User ID: ", req.user._id);
    const orders = await Order.find({ seller: req.user._id });
    console.log("Orders found: ", orders.length);
    if (orders.length === 0) {
      return res.json({ message: "No orders found for this user" });
    }
    const orderIds = orders.map((order) => order._id);
    console.log("Order IDs:", orderIds);
    const payments = await Payment.find({ order: { $in: orderIds } }).populate(
      "order"
    );
    console.log("Payments found:", payments.length);
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
