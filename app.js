const express = require("express");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded());

// create server
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server running at port ${port}`);