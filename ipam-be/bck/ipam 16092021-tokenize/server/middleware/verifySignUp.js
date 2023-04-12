const db = require("../models");
const ROLES = db.ROLES;
const User = db.ipamuser;

checkDuplicateUsername = (req, res, next) => {
    // Username
    User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        res.status(400).send({ message: "Failed! Username is already exist!" });
        return;
      }
      next();
    });
  };
  
  
  const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
  };
  
  module.exports = verifySignUp;
