const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ChatSession extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'tutor', foreignKey: 'tutorId' });
      this.belongsTo(models.User, { as: 'student', foreignKey: 'studentId' });
      this.hasMany(models.ChatMessage, { foreignKey: 'chatSessionId' });
    }
  }

  ChatSession.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    tutorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ChatSessions',
  });

  return ChatSession;
};