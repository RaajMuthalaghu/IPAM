const ipamuserController = require('../controllers').ipamuser;
const ipamnetworkController = require('../controllers').ipamnetwork;
const ipamipController = require('../controllers').ipamip;

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get('/', (req, res) => res.status(200).send({message: 'Welcome to the ipamuser API!',}));
  app.get('/auth/signin', ipamuserController.authenticate);
  app.post('/auth/signup', ipamuserController.isAdmin, ipamuserController.create);
  app.get('/users', ipamuserController.isAdmin, ipamuserController.list);
  app.get('/users/:username', ipamuserController.isUser, ipamuserController.retrieve);
  app.put('/users/toggleadmintype/:username', ipamuserController.isAdmin, ipamuserController.isAdmin, ipamuserController.toggleadmintype);
  app.put('/users/updatePassword/:username', ipamuserController.isAdmin, ipamuserController.isAdmin, ipamuserController.updatePassword);
  app.put('/users/:username', ipamuserController.isAdmin, ipamuserController.update);
  app.delete('/users/:username', ipamuserController.isAdmin, ipamuserController.destroy);
  
  app.get('/networks', ipamuserController.isUser, ipamnetworkController.list);
  app.post('/networks', ipamuserController.isAdmin, ipamnetworkController.create);
  app.post('/addnetwork', ipamuserController.isAdmin, ipamnetworkController.create);
  app.get('/networks/:network', ipamuserController.isUser, ipamnetworkController.retrieve);
  app.get('/network/:network', ipamuserController.isUser, ipamnetworkController.find);
  app.put('/networks/:network', ipamuserController.isAdmin, ipamnetworkController.update);
  app.delete('/networks/:network', ipamuserController.isAdmin, ipamnetworkController.destroy);
  
  app.get('/ips', ipamuserController.isUser, ipamipController.list);
  app.post('/ips', ipamuserController.isAdmin, ipamipController.bulkCreate);
  app.get('/ips/:network', ipamuserController.isUser, ipamipController.retrieve);
  app.get('/ip/:ip', ipamuserController.isUser, ipamipController.retrieveIP);
  app.put('/ips/:ip', ipamuserController.isUser, ipamipController.update);
  app.delete('/ips/:ip', ipamuserController.isAdmin, ipamipController.destroy);
};
