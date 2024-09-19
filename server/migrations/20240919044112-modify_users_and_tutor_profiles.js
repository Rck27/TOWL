'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tutor_profiles', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contact_number: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      grade: {
        type: Sequelize.ARRAY(Sequelize.STRING(3)),
        allowNull: false
      },
      availability: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      price_preference: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tutor_profiles');
  }
};