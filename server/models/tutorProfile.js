'use strict';

const { sequelize } = require("../models");

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const TutorProfile = sequelize.define('tutor_profile', {
        user_id: { // Reference to the users table
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'users', // Name of the table you're referencing
                key: 'user_id'  // Key in the users table
            },
            onUpdate: 'CASCADE',  // Optional: Update on referenced row change
            onDelete: 'SET NULL', // Optional: Set to null if the user is deleted
        },
        nama: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'), // Enum for gender
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contact_number: {
            type: DataTypes.STRING(15),  // Adjust length as needed
            allowNull: false
        },
        grade: {
            type: DataTypes.ARRAY(DataTypes.STRING(3)), // Array of 3-character strings
            allowNull: false,
            validate: {
                len: [3]  // Ensure the array has exactly 3 elements
            }
        },
        availability: {
            type: DataTypes.ARRAY(DataTypes.STRING), // 7-element array for availability days
            allowNull: false,
            validate: {
                len: [7]  // Ensure the array contains 7 elements
            }
        },
        price_preference: {
            type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of numbers for price preference
            allowNull: false
        },
        location: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: true // You can make this false if location is required
          }
    }, {
        tableName: 'tutor_profiles',  // Optional: explicitly define the table name
        timestamps: true  // Optional: auto-create `createdAt` and `updatedAt`
    });

    TutorProfile.associate = function(models) {
        // Define the relationship with the users table
        TutorProfile.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'user_id'
        });
    };

    return TutorProfile;
};
