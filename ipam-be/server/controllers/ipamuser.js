const ipamuser = require('../models').ipamuser;
var bcrypt = require("bcryptjs");

module.exports = {
  isUser(req, res, next){
    let authorization = req.headers["authorization"]
    if (authorization == null || (authorization.split(" ")[0] !="Basic"))res.status(403).send({ message: "Require credential to pass" });
    let usernamepassword = Buffer.from(authorization.split(" ")[1], 'base64').toString()

    ipamuser
    .findOne({ where: { username: usernamepassword.split(":")[0] } })  
    .then(ipamuser => { 
      if (!ipamuser) { res.status(404).send({ message: 'Username Not Found', }); }
      
      var passwordIsValid = bcrypt.compareSync(usernamepassword.split(":")[1], ipamuser.password);
      if (!passwordIsValid) { return res.status(401).send({ message: "Invalid Password!" }); }

      next();
      return;
    })
    .catch(error => res.status(400).send(error));
  },

  isAdmin(req, res, next){
    let authorization = req.headers["authorization"]
    if (authorization == null || (authorization.split(" ")[0] !="Basic"))res.status(403).send({ message: "Require credential to pass" });
    let usernamepassword = Buffer.from(authorization.split(" ")[1], 'base64').toString()
    
    ipamuser
    .findOne({ where: { username: usernamepassword.split(":")[0] } })  
    .then(ipamuser => { 
      if (!ipamuser) { res.status(404).send({ message: 'Username Not Found', }); }

      var passwordIsValid = bcrypt.compareSync(usernamepassword.split(":")[1], ipamuser.password);
      if (!passwordIsValid) { return res.status(401).send({ message: "Invalid Password!" }); }

      if (ipamuser.admintype) { next(); return; }
      res.status(403).send({ message: "Require Admin Role to perform this action!" });
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
  authenticate(req, res){
    let authorization = req.headers["authorization"]
    if (authorization == null || (authorization.split(" ")[0] !="Basic"))return res.status(403).send({ message: "Require credential to pass" });
    let usernamepassword = Buffer.from(authorization.split(" ")[1], 'base64').toString()
    console.log(usernamepassword)
    ipamuser
    .findOne({ where: { username: usernamepassword.split(":")[0] } })  
    .then(ipamuser => { 
      if (!ipamuser) { return res.status(201).send({ message: 'Username Not Found' }); }

      var passwordIsValid = bcrypt.compareSync(usernamepassword.split(":")[1], ipamuser.password);
      if (!passwordIsValid) { return res.status(201).send({ message: "Invalid Password!" }); }
      return res.status(200).send({message: "SUCCESS"});
    })
    .catch(error => res.status(400).send({message: error}));
  },
  create(req, res) {
    console.log(req.body.admintype);
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
//        .findAll({ where: {username: {$like: "%" + req.params.username + "%"},}, })
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
  updatePassword(req, res) {
    ipamuser
     .update({
      password: bcrypt.hashSync(req.body.password || ipamuser.password, 8),
     }, {where: { username: req.params.username, }}
     )
//      .then(() => res.status(200).send(ipamuser))  // Send back the updated ipamuser.
     .then(() => res.status(200).send({"updated": req.params.username}))  // Send back the updated ipamuser.
     .catch((error) => res.status(400).send(error));
 },
 toggleadmintype(req, res) {
   console.log(req.body.admintype);
  ipamuser
   .update({
    admintype: !req.body.admintype,
   }, {where: { username: req.params.username, }}
   )
//      .then(() => res.status(200).send(ipamuser))  // Send back the updated ipamuser.
   .then(() => res.status(200).send({"updated": req.params.username}))  // Send back the updated ipamuser.
   .catch((error) => res.status(400).send(error));
},
update(req, res) {
  console.log(req.body.admintype);
  ipamuser
   .update({
    password: bcrypt.hashSync(req.body.password || ipamuser.password, 8),
    admintype: req.body.admintype,
  }, {where: { username: req.params.username, }}
    )
   .then((obj) => res.status(200).send({"updated ": req.params.username}))  // Send back the updated ipamnetwork.
   .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return ipamuser
    .destroy({where: { username: req.params.username, }})
    .then(() => res.status(200).send({"status":"success"}))  // Send back the updated ipamuser.
    .catch((error) => res.status(400).send(error));
},
};

