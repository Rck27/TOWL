const db = require("../models")
const config = require("../config/auth.config")
const User = db.user;
const TutorProfile =  db.tutorProfile;
const crypto =  require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const mailAuth = require("../config/auth.config")
var  jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize");

const  Op =  db.sequelize.Op;


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: mailAuth.auth
})

exports.requestPasswordReset= (req, res, next) => {
const inputEmail = req.body.email;
console.log("email reset iputted is ", inputEmail);
    User.findOne({where: {email: inputEmail}})
    .then(user => {
        if(!user){
            return res.status(404).send({message: "user not found"});
        }
        resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        console.log("input email is ", inputEmail, user.email);
        console.log("Reset token is ", resetToken);
        console.log("expired at ", resetTokenExpiry);
        // Save token hash and expiry in the user's record
        return user.update({
            reset_password_token: resetTokenHash,
            reset_password_expires: resetTokenExpiry
        })
    })
    //not yet tested  with real account
    .then(user => {
        // Send email with reset token
        const resetUrl = `http://localhost:3000/api/auth/resetPassword/${resetToken}`;
        const mailOptions = {
            to: user.email,
            from: 'your-email@gmail.com',
            subject: 'Password Reset Request',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            ${resetUrl}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };
        console.log(JSON.stringify(mailOptions));
        res.status(200).send({message: "successful"});
        // transporter.sendMail(mailOptions, (err) => {
        //     if (err) {
        //         console.error("Error sending email:", err);
        //         return res.status(500).send({ message: "Error sending email" });
        //     }
        //     res.status(200).send({ message: "Password reset email sent successfully!" });
        // });
    })
    .catch(err => {
        console.error("error requesting password reset: ", err);
        res.status(401).send({message: "error requesting password reset"})
    });

    
};


exports.signUp = (req, res) => {
    console.log("Attempting to create user:", req.body.username);
    User.create({
        username: req.body.username,
        email: req.body.email,
        user_type: req.body.user_type,
        password_hash: bcrypt.hashSync(req.body.password, 8)
    })
    
    .then(user => {
        console.log("USER ID IS", user.user_id);
        // Create a tutor profile for this user
        return TutorProfile.create({
            user_id: user.user_id,
            nama: req.body.nama || 'Default Name',
            gender: req.body.gender || 'male',
            age: req.body.age || 25,
            contact_number: req.body.contact_number || '1234567890',
            grade: req.body.grade || ['7'],  // Provide a default value
            availability: req.body.availability || ['Monday', 'Wednesday', 'Friday'],  // Provide a default value
            price_preference: req.body.price_preference || [50, 100]
        });
    })
      .catch(err  => {
        console.log("ERROR IIS", err);
        console.log("tutor profile not successful");
        
      })
    .then(user => {
        console.log("User created successfully:", req.email);
        res.status(201).send({ message: "User registered successfully" });
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

        const token = jwt.sign({
            user_id: user.user_id, email: user.email 
        },
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