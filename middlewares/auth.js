const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  // get the token
  let token = req.headers.authorization;
  if (!token) {
    res.setHeader("Content-Type", "text/html");
    res.end(`
    <html>
    <head>
    </head>
    <body>
    <h1> Token Not Given </h1>
    </body>
    <html>`);
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      res.setHeader("Content-Type", "text/html");
      res.end(`
      <html>
      <head>
      </head>
      <body>
      <h1> Token Not Valid </h1>
      </body>
      <html>`);
    } else {
      let user = await User.findById(decoded._id);
      if (!user) {
        res.setHeader("Content-Type", "text/html");
        res.end(`
        <html>
        <head>
        </head>
        <body>
        <h1> Token Not Valid </h1>
        </body>
        <html>`);
      }

      req.userId = decoded._id;
      next();
    }
  });
};
