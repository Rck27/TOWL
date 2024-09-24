const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ChatMessage extends Model {
    static associate(models) {
      this.belongsTo(models.ChatSession, { foreignKey: 'chatSessionId' });
      this.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
    }
  }

  ChatMessage.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    chatSessionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    messageType: {
      type: DataTypes.ENUM('text', 'photo', 'location'),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });

  return ChatMessage;
};