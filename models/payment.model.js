const mongoose = require("mongoose");
const Schema = require("mongoose");

const paymentSchema = new mongoose.Schema({
    resident: { type: Schema.Types.ObjectId, ref: "Resident" },
    period: Date,
    amount: Number,
    isPaid: Boolean,
    paymentDate: Date
});

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
