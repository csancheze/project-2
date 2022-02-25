const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserEvent extends Model {}

// create fields/columns for Trip model
UserEvent.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user-event'
  }
);

module.exports = UserEvent;
