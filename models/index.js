const mongoose = require("mongoose");
const User = require("./user.model");

async function connectToDatabase() {
  try {
    console.log("Connecting to database...");
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => {
        console.log("MongoDB Connection Succeeded.");
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    connectToDatabase,
    User
}