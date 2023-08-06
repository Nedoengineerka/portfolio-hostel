const mongoose = require("mongoose");
const Schema = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    token: String,
    expiriedAt: Date,
});

const refreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema);

module.exports = refreshTokenModel;
