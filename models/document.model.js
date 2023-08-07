const mongoose = require("mongoose");
const Schema = require("mongoose");

const documentSchema = new mongoose.Schema({
    resident: { type: Schema.Types.ObjectId, ref: "resident" },
    type: String,
    data: String
});

const Document = mongoose.model("document", documentSchema);

module.exports = Document;
