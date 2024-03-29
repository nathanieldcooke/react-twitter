const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const { User } = require("./db/models");
const bearerToken = require('express-bearer-token')

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  // Don't store the user's hashed password
  // in the token data.
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // Create the token.
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );

  return token;
};

const restoreUser = (req, res, next) => {
  // token being parsed from request's cookies by the cookie-parser middleware
  // function in app.js:

  // ORIGINAL WAY TO ACCESS TOKEN, DOES NOT WORK.
  // const { token } = req.cookies; // this is not working

  // 1. with express-bearer-token installed and bearerToken invoked, token is available 
  // const { token } = req;

  // 2. alternative way to access token on request body
  const token = req.headers.authorization.split(' ')[1];




  // console.log("BACK AUTH: ", req.cookies, req.headers)

  if (!token) {
    // Send a "401 Unauthorized" response status code
    return res.status(401).end();
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      // remove the token cookie
      res.clearCookie("token");
      return next(e);
    }

    if (!req.user) {
      // Send a "401 Unauthorized" response status code
      // along with removing the token cookie
      res.clearCookie("token");
      return res.status(401).end();
    }

    return next();
  });
};

const requireAuth = [bearerToken(), restoreUser];

module.exports = { getUserToken, requireAuth };
