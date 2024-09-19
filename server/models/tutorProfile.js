'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TutorProfile extends Model {
    static associate(models) {
      // define association here
      TutorProfile.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'user_id'
      });
    }
  }

  TutorProfile.init({
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    },
    availability: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    //   validate: {
    //     len: [1, 7]  // Allow at least 1 and at most 7 days
    //   }
    },
    price_preference: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TutorProfile',
    tableName: 'tutor_profiles',
    timestamps: true
  });

  return TutorProfile;
};