const express = require("express");
require("dotenv").config();
const db = require("./models");

const app = express();

// database
db.connectToDatabase();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create server
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server running at port ${port}`);