const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const middlewares = require("../middleware");

authRouter.get("/login", authController.login);
authRouter.post("/register", middlewares.auth.adminAccess, authController.register);
authRouter.get("/refresh", authController.refresh);

module.exports = authRouter;
