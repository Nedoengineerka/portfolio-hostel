const express = require("express");
require("dotenv").config();
const db = require("./models");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const logger  = require("./services/logger.service");
const httpPino = require("pino-http");
const loggerConfig = require("./config/logger.config");

const app = express();

// database
db.connectToDatabase();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(httpPino({
    logger: logger,
    serializers: {
      err: loggerConfig.errSerializer,
      req: loggerConfig.reqSerializer,
      res: loggerConfig.resSerializer
    },
}));


// create server
const port = process.env.PORT || 3000;
app.listen(port);

logger.info(`Server running at port ${port}`);

//routes
app.use("/auth", routes.authRouter);
app.use("/resident", routes.residentRouter);