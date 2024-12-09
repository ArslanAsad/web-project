const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storeName: String,
  storeDescription: String,
  contactInfo: String,
  // Add more fields as needed
});

module.exports = mongoose.model("users", UserSchema);
