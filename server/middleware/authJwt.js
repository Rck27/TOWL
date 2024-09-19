const jwt = require("jsonwebtoken");
const  config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const crypto = require("crypto");
const Op = require("sequelize");

passwordReset = (req, res,  next) => {
    const resetToken = req.params.token;
    console.log("token is", resetToken);
    // Hash the provided token to compare with stored hash
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Find user by reset token and ensure token hasn't expired
    User.findOne({
        where: {
            reset_password_token: resetTokenHash,
            reset_password_expires: { [Op.gt]: Date.now() } // Ensure token is not expired
        }
    })
    .then(user => {
        if (!user) {
            return res.status(400).send({ message: "Invalid or expired token" });
        }

        // Validate and hash the new password
        const newPassword = req.body.password;
        if (newPassword.length < 8) {
            return res.status(400).send({ message: "Password must be at least 8 characters long" });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 8);

        // Update the user's password and clear the reset token fields
        return user.update({
            password_hash: hashedPassword,
            reset_password_token: null,  // Clear the token
            reset_password_expires: null // Clear the expiration
        })
        .then(() => {
            res.status(200).send({ message: "Password reset successfully!" });
        });
    })
    .catch(err => {
        console.error("Error resetting password:", err);
        res.status(500).send({ message: "Error resetting password" });
    });
}

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
    isTutor: isTutor,
    passwordReset: passwordReset
};
module.exports = authJwt