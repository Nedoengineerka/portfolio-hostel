
require("dotenv").config();

const refreshTokenConfig = {
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn_String: "12h",
    expiresIn_Date: () => new Date(Date.now() + 12 * 60 * 60 * 1000),
};

const accessTokenConfig = {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn_String: "1h",
};

const jwtCookieConfig = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 12 * 60 * 60 * 1000, // hours to ms
};

module.exports = {
    refreshTokenConfig,
    accessTokenConfig,
    jwtCookieConfig
}