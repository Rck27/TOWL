const db = require("../models");
const fs = require("fs");
// const User = db.user;
const TutorProfile = db.tutorProfile;  // Ensure this matches the export name
exports.tutorAccess = (req, res) => {
    res.status(200).send("akses tutor");
};
exports.studentAccess =  (req, res) => {
    res.status(200).send("akses murid");
};

exports.updateUserProfile = (req, res, next) => {
    // console.log("Loaded models:", Object.keys(db));
    console.log("User ID:", req.user_id);  // Add this line to check the user_id

    TutorProfile.findOne({
        where: { user_id: req.user_id }
    })
    .then((profile) => {
        if (!profile) {
            console.log("Profile not found for user_id:", req.user_id);  // Add this line for debugging
            res.status(404).send({ message: "Profile not found." });
            return null;  // Return null to skip the next .then() block
        }
        console.log("USER ID IS", profile.user_id);
        // Create a tutor profile for this user
        return profile.update({
            user_id: profile.user_id,
            nama: req.body.nama || profile.nama,
            gender: req.body.gender || profile.gender,
            age: req.body.age || profile.age,
            contact_number: req.body.contact_number || profile.contact_number,
            grade: req.body.grade || profile.grade,  // No length validation
            availability: req.body.availability || profile.availability,  // No length validation
            price_preference: req.body.price_preference || profile.price_preference
        });
    })
    .then((savedProfile) => {
        if (savedProfile) {
            res.status(200).send({ message: "Profile updated successfully." });
        }
    })
    .catch((err) => {
        console.error("Error updating profile:", err);
        res.status(500).send({ message: "Error updating profile." });
    });
};