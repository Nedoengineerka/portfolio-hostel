const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function adminAccess(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).end("Token is needed");
    else {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            res.status(403);
            if (err instanceof jwt.TokenExpiredError) {
              res.end("Token expired");
            } else if (err instanceof jwt.JsonWebTokenError) {
              res.end("Invalid token or signature");
            } else res.end(`An error occurred: ${err.message}`);
          } else {
            await User.findOne({ login: decoded.login }).then((user) => {
              if (!user) res.status(409).end("User not found");
              if (user.role != 1) res.status(401).end("Access denied");
              else next();
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
}

async function userAccess(req, res, next) {
  try {
    const token = req.headers["x-access-token"];
    if (token == null) return res.status(401).end("Token is needed");
    else {
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            res.status(403);
            if (err instanceof jwt.TokenExpiredError) {
              res.end("Token expired");
            } else if (err instanceof jwt.JsonWebTokenError) {
              res.end("Invalid token or signature");
            } else res.end(`An error occurred: ${err.message}`);
          } else {
            await User.findOne({ login: decoded.login }).then((user) => {
              if (!user) res.status(409).end("User not found");
              else next();
            });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
}

module.exports = {
  adminAccess,
  userAccess,
};
