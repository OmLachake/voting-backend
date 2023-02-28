const jwt = require("jsonwebtoken");

const verifyLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Authorization Failed. Please Login Again.",
          failed: true,
        });
      }
      if (user) {
        req.body.user = user;
        next();
      }
    });
  } else {
    return res.status(400).json({
      message: "Authorization Failed. Please Login Again.",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.body.user) {
    if (req.body.user.role === "admin") {
      next();
    } else {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  } else {
    return res.status(400).json({
      message: "Authorization Failed. Please Login Again.",
    });
  }
};
const isModerator = (req, res, next) => {
  if (req.body.user) {
    if (req.body.user.role === "admin" || req.body.user.role === "moderator") {
      next();
    } else {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }
  } else {
    return res.status(400).json({
      message: "Authorization Failed. Please Login Again.",
    });
  }
};

const verifyVoterLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Authorization Failed. Please Login Again.",
          failed: true,
        });
      }
      if (user) {
        req.body.user = user;
        next();
      }
    });
  } else {
    return res.status(400).json({
      message: "Authorization Failed. Please Login Again.",
    });
  }
};
module.exports = { verifyLogin, isAdmin, isModerator, verifyVoterLogin };
