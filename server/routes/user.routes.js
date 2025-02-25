const {authJwt} = require("../middleware");
const controller = require("../controller/user.controller");
const { TutorProfile, User } = require('../models');
const db =  require("../models");
const  Op =  db.sequelize.Op;

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // app.get("/api/test/all", controller.allAccess);
  
    app.get(
      "/api/test/user",[
        authJwt.verifyToken, authJwt.isStudent],
      controller.studentAccess
    );
  
    app.get(
      "/api/test/mod",
      [authJwt.verifyToken, authJwt.isTutor],
      controller.tutorAccess
    );

    // app.get(
    //   "/api/filter",
    //   [authJwt.verifyToken, authJwt.isStudent],
    //   controller.search
    // );


app.get('/search',
// [authJwt.verifyToken, authJwt.isStudent],
controller.searchTutor
);

    app.post(
      "/api/update/user",
      [authJwt.verifyToken],
      controller.updateUserProfile
    );

  };
  