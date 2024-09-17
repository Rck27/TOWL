const db = require("../models");
const TutorProfile = db.TutorProfile;
const Op = db.sequelize.Op;

exports.addInfo  = (req, res) => {
    TutorProfile.create({
        user_id: "idk",
        nama: 'John Doe',
        gender: 'male',
        age: 30,
        contact_number: '123456789',
        grade: ['A', 'B', 'C'],
        availability: ['mon', 'tue'],
        price_preference: [100, 200],
        location: { type: 'Point', coordinates: [120.1234, -5.6789] }
      })
      .then((tutor) => {
        res.status(201).send({message: "info updated"});
        
      }).catch((err) => {
        res.status(500).send({message: "error happened"});
      });
      
}