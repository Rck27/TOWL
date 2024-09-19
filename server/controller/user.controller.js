const db = require("../models");
const fs = require("fs");
const TutorProfile = db.profile;  // Ensure this matches the export name
exports.tutorAccess = (req, res) => {
    res.status(200).send("akses tutor");
};
exports.studentAccess =  (req, res) => {
    res.status(200).send("akses murid");
};

exports.updateUserProfile = (req, res, next) => {

    // db.sequelize.sync({ force: true }).then(() => {
    //     console.log("Database & tables created!");
    // });
    // db.sequelize.sync({ force: true, logging: console.log }); 


        // console.log("user_id is " + req.user_id);
    // console.log(TutorProfile);
    console.log("Loaded models:", Object.keys(db));
    res.status(201).send("yay");
    // // Assuming you have a TutorProfile model already set up
    TutorProfile.findOne({
        where: { user_id: req.user_id }  // Find the profile by user_id
    })
    .then((TutorProfile) => {
        if (!TutorProfile) {
            return res.status(404).send({ message: "Profile not found." });
        }

        // Update the tutor profile with the data from the request body
        TutorProfile.nama = req.body.nama || TutorProfile.nama;
        TutorProfile.gender = req.body.gender || TutorProfile.gender;
        TutorProfile.age = req.body.age || TutorProfile.age;
        TutorProfile.contact_number = req.body.contact_number || TutorProfile.contact_number;
        TutorProfile.grade = req.body.grade || TutorProfile.grade;  // Assuming it's an array or comma-separated string
        TutorProfile.availability = req.body.availability || TutorProfile.availability;  // Assuming it's an array or comma-separated string
        TutorProfile.price_preference = req.body.price_preference || TutorProfile.price_preference;  // Assuming it's an array or comma-separated string
        // TutorProfile.location = req.body.location || TutorProfile.location;  // Assuming location is an object with { type: 'Point', coordinates: [...] }

        // Save the updated profile
        return TutorProfile.save();
    })
    .then(() => {
        res.status(200).send({ message: "Profile updated successfully." });
    })
    .catch((err) => {
        console.error("Error updating profile:", err);
        res.status(500).send({ message: "Error updating profile." });
    });

};
