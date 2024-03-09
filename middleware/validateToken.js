const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "User is not authorized" }); 
        return; 
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401).json({ message: "User is not authorized or token is missing" }); 
    return; 
  }
});

module.exports = validateToken;
