const {verifySignUp}  =  require("../middleware");
const controller = require("../controller/auth.controller");
const app = require("../../app");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    app.post(
        "/api/auth/signup",[
            verifySignUp.checkDuplicateMailUsername
        ], controller.signUp
    );
    app.post("/api/auth/signin",controller.signIn);
    };
