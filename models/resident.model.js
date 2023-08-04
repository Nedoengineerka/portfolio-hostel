const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  nameSurname: String,
  status: String,
  hostel: String,
  room: String,
  faculty: String,
  group: String,
  isDebtor: Boolean,
  phoneNumber: String,
  passportNumber: { type: String, unique: true },
});

const Resident = mongoose.model("resident", residentSchema);

module.exports = Resident;
