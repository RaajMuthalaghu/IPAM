const ipamip = require('../models').ipamip;

module.exports = {
  list(req, res) {
    return ipamip
      .findAll()
      .then(ipamip => res.status(200).send(ipamip))
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    return ipamip
      .create({
        network: req.body.network,
        ip: req.body.ip,
        exclude: req.body.exclude,
        hostname: req.body.hostname
      })
      .then(ipamip => res.status(201).send(ipamip.ip + " added into " + ipamip.network + " Network Successfully!"))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return ipamip
        .findAll({ where: {network: req.params.network,}, })
    .then(ipamip => {
      if (!ipamip) {
        res.status(404).send({
          message: 'Network Not Found',
        });
      }
      return res.status(200).send(ipamip);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    ipamip
     .update({
       exclude: req.body.exclude || ipamip.exclude,
       hostname: req.body.hostname || ipamip.hostname,
     }, {where: { ip: req.params.ip, }}
     )
//      .then(() => res.status(200).send(ipamip))  // Send back the updated ipamip.
     .then(obj => res.status(200).send({"updated IP": req.params.ip}))  // Send back the updated ipamip.
     .catch((error) => res.status(400).send(error));
 },
 destroy(req, res) {
  return ipamip
    .destroy({where: { ip: req.params.ip, }})
    .then(() => res.status(200).send({"status":"success"}))  // Send back the updated ipamip.
    .catch((error) => res.status(400).send(error));
 },
};

