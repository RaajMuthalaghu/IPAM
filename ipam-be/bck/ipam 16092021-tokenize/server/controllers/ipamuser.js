const ipamuser = require('../models').ipamuser;
const config = require("../config/auth.config");
const db = require("../models");

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = {
//   authenticate(req, res) {
//     ipamuser
//     .findAll({ where: {username: req.body.username,}, })
//     .then(ipamuser => {
//       if (!ipamuser) { res.status(404).send({ message: 'Username Not Found', }); }
//       if (ipamuser[0].password != req.body.password) { res.status(404).send({ message: 'Password does Not Match', }); }
//       return res.status(200).send({ "message": "User Authenticated" });
//     })
//    .catch((error) => res.status(400).send(error));
//  },
  authenticate(req, res) {
    ipamuser
    .findOne({ where: {username: req.body.username} })
    .then(ipamuser => {
      if (!ipamuser) { res.status(404).send({ message: 'Username Not Found', }); }
      var passwordIsValid = bcrypt.compareSync(req.body.password, ipamuser.password);
      if (!passwordIsValid) { return res.status(401).send({ accessToken: null, message: "Invalid Password!" }); }
//      if (ipamuser[0].password != req.body.password) { res.status(404).send({ message: 'Password does Not Match', }); }
      var token = jwt.sign({ username: ipamuser.username }, config.secret, { expiresIn: 3600 }); // expires in 1 hr
      if (ipamuser.admintype == true) {var role = "ADMIN"} else {var role = "USER"}
      return res.status(200).send({ username: ipamuser.username, role: role, accessToken: token});
    })
  .catch((error) => res.status(400).send(error));
  },

  isAdmin(req, res, next){
    ipamuser
    .findOne({ where: { username: req.body.username } })  
    .then(ipamuser => { 
      if (ipamuser.admintype) { next(); return; }
      res.status(403).send({ message: "Require Admin Role!" });
      return;
    })
    .catch(error => res.status(400).send(error));
  },

  list(req, res) {

    return ipamuser
      .findAll()
      .then(ipamuser => res.status(200).send(ipamuser))
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return ipamuser
      .create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        admintype: req.body.admintype,
      })
      .then(ipamuser => res.status(201).send(ipamuser.username + " User created Successfully!"))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return ipamuser
        .findAll({ where: {username: req.params.username,}, })
    .then(ipamuser => {
      if (!ipamuser) {
        res.status(404).send({
          message: 'Username Not Found',
        });
      }
      return res.status(200).send(ipamuser);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    ipamuser
     .update({
      password: req.body.password || ipamuser.password,
      admintype: req.body.admintype || ipamuser.admintype,
     }, {where: { username: req.params.username, }}
     )
//      .then(() => res.status(200).send(ipamuser))  // Send back the updated ipamuser.
     .then(() => res.status(200).send({"updated": req.params.username}))  // Send back the updated ipamuser.
     .catch((error) => res.status(400).send(error));
 },
 destroy(req, res) {
  return ipamuser
    .destroy({where: { username: req.params.username, }})
    .then(() => res.status(200).send({"status":"success"}))  // Send back the updated ipamuser.
    .catch((error) => res.status(400).send(error));
},
};

