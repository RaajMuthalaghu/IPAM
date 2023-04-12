const ipamnetwork = require('../models').ipamnetwork;
const ipamip = require('../models').ipamip;

module.exports = {
  list(req, res) {
    return ipamnetwork
      .findAll({
  //      include: [{ model: ipamip, }],
      })  
      .then(ipamnetwork => res.status(200).send(ipamnetwork))
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    console.log("network creation invoked")
    return ipamnetwork
      .create({
        network: req.body.network,
        vlan: req.body.vlan,
        subnet: req.body.subnet,
        netmask: req.body.netmask,
        gateway: req.body.gateway,
        fromip: req.body.fromip,
        toip: req.body.toip
      })
      .then(ipamnetwork => res.status(201).send(ipamnetwork.network + " Network created Successfully!"))
      .catch(error => res.status(400).send(error));
  },
  find(req, res) {
    return ipamnetwork
      .findOne({
        where: {network: req.params.network,},
        raw: true
      })
      .then(ipamnetwork => res.status(200).send(ipamnetwork))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    ipamnetwork
    .findOne({
      where: {network: req.params.network,},
      raw: true
    })
    .then(net => {
      if (!net) {
        res.status(404).send({
          message: 'ipamnetwork Not Found',
        });
        return;
      }
      let obj = net;
      ipamip
      .findAll({
        where: {network: obj.network},
        raw: true
      })
      .then(ips => {
        obj.ips = ips;
        res.status(200).send(obj);
      })
      .catch(error => {
        res.status(400).send(error)
      });
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
     ipamnetwork
      .update({
        vlan: req.body.vlan || ipamnetwork.vlan,
        subnet: req.body.subnet || ipamnetwork.subnet,
        netmask: req.body.netmask || ipamnetwork.netmask,
        gateway: req.body.gateway || ipamnetwork.gateway,
        fromip: req.body.fromip || ipamnetwork.fromip,
        toip: req.body.toip || ipamnetwork.toip,
      }, {where: { network: req.params.network, }}
      )
//      .then(() => res.status(200).send(ipamnetwork))  // Send back the updated ipamnetwork.
      .then((obj) => res.status(200).send({"Network updated ": req.params.network}))  // Send back the updated ipamnetwork.
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return ipamnetwork
      .destroy({where: { network: req.params.network, }})
      .then(() => res.status(200).send({"status":"success"}))  // Send back the updated ipamnetwork.
      .catch((error) => res.status(400).send(error));
  },
};
