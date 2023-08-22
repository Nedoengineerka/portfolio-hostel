const pino = require("pino");
const loggerConfig = require("../config/logger.config");

module.exports = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  loggerConfig.transport
);
