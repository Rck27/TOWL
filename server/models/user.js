'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.ChatSession, { as: 'tutorSessions', foreignKey: 'tutorId' });
      this.hasMany(models.ChatSession, { as: 'studentSessions', foreignKey: 'studentId' });
      this.hasMany(models.ChatMessage, { as: 'sentMessages', foreignKey: 'senderId' });    
      User.hasOne(models.TutorProfile, {
        foreignKey: 'user_id',
        sourceKey: 'user_id'
      });
    }
  }

  User.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_type: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },  
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull:  true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    underscored: true
  });

  return User;
};