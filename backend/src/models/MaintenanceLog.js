const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');

const MaintenanceLog = sequelize.define('MaintenanceLog', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  issueDescription: { type: DataTypes.TEXT, allowNull: false },
  cost: { type: DataTypes.FLOAT, defaultValue: 0 },
  status: { type: DataTypes.ENUM('Open', 'Resolved'), defaultValue: 'Open' }
});

MaintenanceLog.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
module.exports = MaintenanceLog;