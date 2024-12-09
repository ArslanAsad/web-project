const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Promotion = require("../models/Promotion");

router.post("/", auth, async (req, res) => {
  try {
    const { code, discountPercentage, validFrom, validTo, products } = req.body;
    const newPromotion = new Promotion({
      seller: req.user._id,
      code,
      discountPercentage,
      validFrom,
      validTo,
      products,
    });

    await newPromotion.save();
    res.json(newPromotion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const promotions = await Promotion.find({ seller: req.user._id });
    res.json(promotions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
