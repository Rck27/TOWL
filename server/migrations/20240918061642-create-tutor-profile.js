'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('tutor_profiles', {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',  // This is the referenced table
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
        allowNull: false
      },
      availability: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      price_preference: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      // location: {
      //   type: DataTypes.GEOMETRY('POINT'),
      //   allowNull: true
      // },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tutor_profiles');
  }
};
