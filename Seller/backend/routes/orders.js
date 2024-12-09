const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Order = require("../models/Order");

router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user._id }).populate(
      "products.product"
    );
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });

    if (order.seller.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
