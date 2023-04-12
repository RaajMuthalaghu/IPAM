const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const ipamuser = require('../models').ipamuser;
const db = require("../models");
const User = db.ipamuser;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) { return res.status(403).send({ message: "No token provided!" }); }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) { return res.status(401).send({ message: "Unauthorized token!" }); }
    req.username = decoded.username;
    next();
  });
};

// isAdmin = (req, res, next) => {
//     ipamuser.findOne({ where: { username: req.body.username } })  
//   .then(ipamuser => {
//       if (ipamuser.admintype) { next(); return; }
//       res.status(403).send({ message: "Require Admin Role!" });
//       return;
//   });
// };


const authJwt = {
  verifyToken: verifyToken
//  isAdmin: isAdmin
};
module.exports = authJwt;
