'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TutorProfile extends Model {
        static associate(models) {
            TutorProfile.belongsTo(models.User, {
                foreignKey: 'user_id',
                targetKey: 'user_id'
            });
        }
    }

    TutorProfile.init({
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'users',
                key: 'user_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        },
        nama: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'other'),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contact_number: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        grade: {
            type: DataTypes.ARRAY(DataTypes.STRING(3)),
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        availability: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                len: [7]
            }
        },
        price_preference: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'TutorProfile',
        tableName: 'tutor_profiles',  // Ensure tableName matches your actual table
        timestamps: true
    });

    return TutorProfile;
};
