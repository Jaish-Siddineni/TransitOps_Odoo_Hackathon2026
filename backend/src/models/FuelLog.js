const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');

const FuelLog = sequelize.define('FuelLog', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  liters: { type: DataTypes.FLOAT, allowNull: false },
  cost: { type: DataTypes.FLOAT, allowNull: false },
  date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW }
});

FuelLog.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
module.exports = FuelLog;