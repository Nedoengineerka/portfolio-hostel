const mongoose = require("mongoose");
const logger = require("../services/logger.service");
const User = require("./user.model");
const Resident = require("./resident.model");
const Document = require("./document.model");
const Payment = require("./payment.model");
const refreshTokenModel = require("./refreshToken.model");

async function connectToDatabase() {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        logger.info("MongoDB Connection Succeeded.");
      })
      .catch((error) => {
        logger.error("Database: " + error.message);
      });
  } catch (error) {
    logger.error("Database: " + error.message);
  }
}

module.exports = {
  connectToDatabase,
  User,
  Resident,
  Document,
  Payment,
  refreshTokenModel,
};
