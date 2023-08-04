const mongoose = require("mongoose");
const Schema = require("mongoose");

const residentSchema = new mongoose.Schema({
  nameSurname: String,
  status: String,
  hostel: String,
  room: String,
  faculty: String,
  group: String,
  isDebtor: Boolean,
  phoneNumber: String,
  documents: [{ type: Schema.Types.ObjectId, ref: "document" }],
  payments: [{ type: Schema.Types.ObjectId, ref: "payment"}]
});

const Resident = mongoose.model("resident", residentSchema);

module.exports = Resident;
