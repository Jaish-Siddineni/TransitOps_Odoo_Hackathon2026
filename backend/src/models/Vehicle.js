const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vehicle = sequelize.define('Vehicle', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  regNo: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false,
    validate: { notEmpty: true } // Strict validation
  },
  model: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('TRUCK', 'VAN'), allowNull: false },
  capacity: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    validate: { min: 100 } 
  },
  status: { 
    type: DataTypes.ENUM('Available', 'On Trip', 'In Shop', 'Retired'), 
    defaultValue: 'Available' 
  },
  odometer: { type: DataTypes.INTEGER, defaultValue: 0 },
  acquisitionCost: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = Vehicle;