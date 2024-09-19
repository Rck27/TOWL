const jwt = require("jsonwebtoken");
const  config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    console.log("token  is " + token);
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
            req.user_id = decoded.user_id;
            next();
        })
};

const isTutor = (req, res, next) => {
    User.findByPk(req.userID).then(user  => {
        if(!user){
            return res.status(404).send({
                Message:  "user not found"
            });
        }
        if(user.user_type  == "tutor"){
            next();
        }
        else {
            res.status(403).send({
                Message: "tutor user is needed"
            });
        }

    })
    .catch(err => {
        res.status(500).send({
            Message : "unable to determine user"
        });
    })
};

const isStudent = (req, res, next) => {
    User.findByPk(req.userID).then(user  => {
        console.log("user  is "+ req.user_id);
        if(!user){
            return res.status(404).send({
                Message:  "user not found"
            });
        }
        if(user.user_type  == "student"){
            next();
        }
        else {
            res.status(403).send({
                Message: "student user is needed"
            });
        }

    })
    .catch(err => {
        res.status(500).send({
            Message : "unable to determine user"
        });
    })
};

const authJwt = {
    verifyToken:  verifyToken,
    isStudent: isStudent,
    isTutor: isTutor
};
module.exports = authJwt