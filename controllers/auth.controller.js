const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const refreshTokenModel = require("../models/refreshToken.model");
const authConfig = require("../config/auth.config");
const logger = require("../services/logger.service");
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
  try {
    const payloads = req.body;
    const user = await User.findOne({ login: payloads.login });
    if (user) {
      res.status(409).end("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payloads.password, salt);
      const newUser = await User.create({
        login: payloads.login,
        password: hashedPassword,
        fullName: payloads.fullName,
        phoneNumber: payloads.phoneNumber,
        passportNumber: payloads.passportNumber,
        role: payloads.role,
      });
      const adminName = jwt.decode(req.cookies.jwtAccess).login;
      logger.info(`Administrator ${adminName}: ${newUser.login} is successfully created.`);
      return res.status(200).end(`${newUser.login} is successfully created.`);
    }
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(409).end("Validation error");
    else if (err.code && err.code == 11000)
      return res
        .status(409)
        .end("User with same phone/passport number already exists");
    else res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.login = async (req, res) => {
  try {
    const payloads = req.body;
    const user = await User.findOne({ login: payloads.login });
    if (!user) {
      res.status(404).end(`User ${payloads.login} not found`);
    } else if (
      payloads.login == user.login &&
      await bcrypt.compare(payloads.password, user.password)
    ) {
      const accessToken = jwt.sign(
        {
          login: user.login,
        },
        authConfig.accessTokenConfig.accessSecret,
        {
          expiresIn: authConfig.accessTokenConfig.expiresIn_String,
        }
      );

      const token = await refreshTokenModel.findOne({ user: user._id });
      if (token) {
        await refreshTokenModel
          .deleteOne(token)
          .then((data) => {
            logger.info(
              `Deleted refresh token(${data.deletedCount}) for ${user.login}`
            );
          })
          .catch((err) => {
            throw err;
          });
      }
      const refreshToken = jwt.sign(
        {
          login: user.login,
        },
        authConfig.refreshTokenConfig.refreshSecret,
        {
          expiresIn: authConfig.refreshTokenConfig.expiresIn_String,
        }
      );

      await refreshTokenModel.create({
        token: refreshToken,
        expiriedAt: authConfig.refreshTokenConfig.expiresIn_Date(),
        user: user._id,
      });
      res.cookie("jwtRefresh", refreshToken, authConfig.jwtRefreshConfig);
      res.cookie("jwtAccess", accessToken, authConfig.jwtAccessConfig);
      logger.info(`Login user: ${user.login}`);
      return res.status(200).end("Authorization has been successful.");
    } else {
      res.status(401).end("Wrong password");
    }
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.refresh = async (req, res) => {
  try {
    if (!req.cookies.jwtRefresh) return res.status(401).end("Token is needed");
    const token = await refreshTokenModel.findOne({
      token: req.cookies.jwtRefresh,
    });
    if (!token) {
      res.status(403).end("Refresh token is required");
    } else {
      jwt.verify(
        req.cookies.jwtRefresh,
        authConfig.refreshTokenConfig.refreshSecret,
        (err, decoded) => {
          if (err) {
            throw err;
          } else {
            const accessToken = jwt.sign(
              {
                login: decoded.login,
              },
              authConfig.accessTokenConfig.accessSecret,
              {
                expiresIn: authConfig.accessTokenConfig.expiresIn_String,
              }
            );
            logger.info(
              `Created new access token for ${decoded.login}`
            );
            res.cookie("jwtAccess", accessToken, authConfig.jwtAccessConfig);
            res
              .status(200)
              .end("The new Access token has been successfully created.");
          }
        }
      );
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(403).end("Token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(403).end("Invalid token or signature");
    } else res.status(500).end(`An error occurred: ${err.message}`);
  }
};
