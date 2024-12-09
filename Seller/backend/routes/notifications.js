const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  auth: {
    user: "your-email@example.com",
    pass: "your-password",
  },
});

router.post("/", auth, async (req, res) => {
  try {
    const { message, type } = req.body;
    const newNotification = new Notification({
      user: req.user._id,
      message,
      type,
    });

    await newNotification.save();

    // Send email notification
    const mailOptions = {
      from: "your-email@example.com",
      to: req.user.email,
      subject: "New Notification",
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json(newNotification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
