const pino = require("pino");
const path = require("path")

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
      },
    },
    {
      target: "pino/file",
      options: { destination: path.join(__dirname, '..', 'logs', 'app.log')},
    },
  ],
});

module.exports = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport
);
