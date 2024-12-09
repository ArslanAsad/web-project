const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Review = require("../models/Review");
const Product = require("../models/Product");

router.post("/:productId", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const newReview = new Review({
      product: req.params.productId,
      buyer: req.user._id,
      rating,
      comment,
    });

    await newReview.save();
    res.json(newReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/product/:productId", auth, async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("buyer", "name");
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
