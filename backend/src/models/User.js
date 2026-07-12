const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  roleId: {
    type: DataTypes.UUID,
    allowNull: false
  }

}, {
  tableName: 'Users'
});

module.exports = User;