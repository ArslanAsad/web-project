const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/products
// @desc    Create a new product
// @access  Private
router.post("/", [auth, upload.single("image")], async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const newProduct = new Product({
      seller: req.user._id,
      name,
      description,
      price,
      stock,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/products
// @desc    Get all products for a seller
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private
router.put("/:id", [auth, upload.single("image")], async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Make sure user owns the product
    if (product.seller.toString() !== req.user._id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { name, description, price, stock } = req.body;
    const productFields = {};
    if (name) productFields.name = name;
    if (description) productFields.description = description;
    if (price) productFields.price = price;
    if (stock) productFields.stock = stock;
    if (req.file) productFields.image = `/uploads/${req.file.filename}`;

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
