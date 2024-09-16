const db = require("../models")
const config = require("../config/auth.config")
const User = db.user;

const  Op =  db.sequelize.Op;

var  jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { UniqueConstraintError } = require("sequelize");

exports.signUp = (req, res) => {
    console.log("Attempting to create user:", req.body.username);
    User.create({
        username: req.body.username,
        email: req.body.email,
        user_type: req.body.user_type,
        password_hash: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        console.log("User created successfully:", user.toJSON());
        res.status(201).send({ message: "User registered successfully!", userId: user.user_id });
    })
    .catch(err => {
        console.error("Error creating user:", err);
        res.status(500).send({ message: err.message });
    });
}


exports.signIn = (req, res) => {
    console.log("Signin attempt for username:", req.body.username);
    
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            console.log("User not found:", req.body.username);
            return res.status(404).send({ message: "User not found." });
        }

        console.log("User found:", user.username);
        console.log("Stored password hash:", user.password_hash);

        if (!user.password_hash) {
            console.error("Password hash is undefined for user:", user.username);
            return res.status(500).send({ message: "Internal server error. Password hash is missing." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password_hash
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }

        const token = jwt.sign({ id: user.user_id },
            config.secret, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
            });

        res.status(200).send({
            id: user.user_id,
            username: user.username,
            email: user.email,
            user_type: user.user_type,
            accessToken: token
        });
    })
    .catch(err => {
        console.error("Error in signIn:", err);
        res.status(500).send({ message: err.message });
    });
}