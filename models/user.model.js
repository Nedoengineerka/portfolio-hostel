const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: { type: String, unique: true },
  password: String,
  fullName: String,
  phoneNumber: { type: String, unique: true },
  passportNumber: { type: String, unique: true },
  role: Number,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
