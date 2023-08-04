const mongoose = require("mongoose");
const Schema = require("mongoose");

const documentSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: "Resident" },
    type: String,
    data: String
});

const Document = mongoose.model("document", documentSchema);

module.exports = Document;
