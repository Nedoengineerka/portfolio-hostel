const express = require("express");
const residentRouter = express.Router();
const residentController = require("../controllers/resident.controller");
const middlewares = require("../middleware");

residentRouter.post("/create", middlewares.auth.userAccess, residentController.createResidents);
residentRouter.get("/find", middlewares.auth.userAccess, residentController.getResidents);
residentRouter.put("/update", middlewares.auth.userAccess, residentController.createResidents);
residentRouter.delete("/delete", middlewares.auth.userAccess, residentController.deleteResidents);

module.exports = residentRouter;
