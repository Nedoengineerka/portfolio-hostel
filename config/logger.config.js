const pino = require("pino");
const path = require("path");

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
      options: { destination: path.join(__dirname, "..", "logs", "app.log") },
    },
  ],
});

// TODO: update serializers for other protected information
const errSerializer = (err) => {
  if (err["cookie"]) err["cookie"] = "HIDDEN";
  if (err["headers"]["cookie"]) err["headers"]["cookie"] = "HIDDEN";
  return err;
};
const resSerializer = (res) => {
  if (res["set-cookie"]) res["set-cookie"] = "HIDDEN";
  if (res["headers"]["set-cookie"]) res["headers"]["set-cookie"] = "HIDDEN";
  return res;
};
const reqSerializer = (req) => {
  if (req["cookie"]) req["cookie"] = "HIDDEN";
  if (req["headers"]["cookie"]) req["headers"]["cookie"] = "HIDDEN";
  return req;
};

module.exports = {
  transport,
  errSerializer,
  resSerializer,
  reqSerializer,
};
