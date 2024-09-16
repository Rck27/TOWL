const db = require("../models");

const User = db.user;

checkDuplicateMailUsername = (req, res, next) => {
    //username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message : "failed,  username already taken"
            });
            return;
        }
    //email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "failed, email already exist"
            });
            return;
        }
        next();
    });

    });
    
};

const verifySignUp  =  {
    checkDuplicateMailUsername : checkDuplicateMailUsername
};

module.exports = verifySignUp;