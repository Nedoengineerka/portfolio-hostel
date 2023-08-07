const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const refreshTokenModel = require("../models/refreshToken.model");
const authConfig = require("../config/auth.config");

exports.register = async (req, res) => {
  try {
    const payloads = req.body;
    await User.findOne({ login: payloads.login }).then(async (user) => {
      if (user) {
        res.status(409).end("User already exists");
      } else {
        await User.create({
          login: payloads.login,
          password: payloads.password,
          nameSurname: payloads.nameSurname,
          phoneNumber: payloads.phoneNumber,
          passportNumber: payloads.passportNumber,
          role: payloads.role,
        })
          .then(async (newUser) => {
            return res
              .status(200)
              .end(`${newUser.login} is successfully created `);
          })
          .catch((err) => {
            if (err.name === "ValidationError")
              return res.status(409).end("Validation error");
            if (err.code && err.code == 11000)
              return res
                .status(409)
                .end("User with same phone/passport number already exists");
          });
      }
    });
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.login = async (req, res) => {
  try {
    const payloads = req.body;
    await User.findOne({ login: payloads.login }).then(async (user) => {
      if (!user) {
        res.status(404).end(`User ${payloads.login} not found`);
      } else if (
        payloads.login == user.login &&
        payloads.password == user.password
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

        await refreshTokenModel
          .findOne({ user: user._id })
          .then(async (token) => {
            if (token) {
              await refreshTokenModel
                .deleteOne(token)
                .then((data) => {
                  //  console.log(data); TODO: add logger
                })
                .catch((err) =>
                  console.log(`An error occurred: ${err.message}`)
                );
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
            res.cookie("jwt", refreshToken, authConfig.jwtCookieConfig);
            return res.status(200).json({ accessToken });
          });
      } else {
        res.status(401).end("Wrong password");
      }
    });
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};

exports.refresh = async (req, res) => {
  try {
    if (!req.cookies.jwt) return res.status(401).end("Token is needed");
    await refreshTokenModel
      .findOne({ token: req.cookies.jwt })
      .then(async (token) => {
        if (!token) {
          res.status(403).end("Refresh token is required");
        } else {
          jwt.verify(
            req.cookies.jwt,
            authConfig.refreshTokenConfig.refreshSecret,
            async (err, decoded) => {
              if (err) {
                console.log(err);
                res.status(403);
                if (err instanceof jwt.TokenExpiredError) {
                  res.end("Token expired");
                } else if (err instanceof jwt.JsonWebTokenError) {
                  res.end("Invalid token or signature");
                } else res.end(`An error occurred: ${err.message}`);
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
                res.status(200).json({ accessToken });
              }
            }
          );
        }
      });
  } catch (err) {
    res.status(500).end(`An error occurred: ${err.message}`);
  }
};
