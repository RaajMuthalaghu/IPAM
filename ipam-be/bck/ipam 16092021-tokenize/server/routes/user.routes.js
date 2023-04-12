const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const ipamuserController = require("../controllers/ipamuser");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/test/all", controller.allAccess);
  app.get("/test/user", [authJwt.verifyToken], controller.userBoard);
  app.post("/test/admin", [authJwt.verifyToken, ipamuserController.isAdmin], controller.adminBoard);
};
