const { verifySignUp } = require("../middleware");
const controller = require("../controllers/ipamuser");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup", [ verifySignUp.checkDuplicateUsername ], controller.create);
  app.post("/auth/signin", controller.authenticate);
};
