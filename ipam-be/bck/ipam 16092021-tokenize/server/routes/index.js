const { authJwt } = require("../middleware");
const ipamuserController = require('../controllers').ipamuser;
const ipamnetworkController = require('../controllers').ipamnetwork;
const ipamipController = require('../controllers').ipamip;

module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    // res.setHeader('Access-Control-Allow-Origin',"http://localhost:5000");
    // res.setHeader('Access-Control-Allow-Headers',"*");
    // res.header('Access-Control-Allow-Credentials', true);
    next();
  });

  // app.get('/', (req, res) => res.status(200).send({message: 'Welcome to the ipamuser API!',}));
  app.get('/users', authJwt.verifyToken, ipamuserController.isAdmin, ipamuserController.list);
  app.post('/users', ipamuserController.create);
  app.get('/users/:username', ipamuserController.retrieve);
  app.put('/users/:username', authJwt.verifyToken, ipamuserController.isAdmin, ipamuserController.update);
  app.delete('/users/:username', ipamuserController.destroy);
  app.post('/authenticate', ipamuserController.authenticate);

  app.get('/networks', ipamnetworkController.list);
  app.post('/networks', ipamnetworkController.create);
  app.get('/networks/:network', ipamnetworkController.retrieve);
  app.put('/networks/:network', ipamnetworkController.update);
  app.delete('/networks/:network', ipamnetworkController.destroy);
  
  app.get('/ips', ipamipController.list);
  app.post('/ips', ipamipController.create);
  app.get('/ips/:network', ipamipController.retrieve);
  app.put('/ips/:ip', ipamipController.update);
  app.delete('/ips/:ip', ipamipController.destroy);
};
