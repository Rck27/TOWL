const jwt = require("jsonwebtoken");
const  config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message : "no token provided"
        });
    }

    jwt.verify(token, 
        config.secret,
        (err, decoded) => {
            if(err){
                return res.status(403).send({
                    message: "unauthorized!"
                });
            }
            req.userID = decoded.id;
        })
};

// isTutor =  (req,  res, next) => {
//     User.findByPk(req.user_id).then(user => {
//         user.get
//     })
// }
const authJwt = {
    verifyToken:  verifyToken
};
module.exports = authJwt