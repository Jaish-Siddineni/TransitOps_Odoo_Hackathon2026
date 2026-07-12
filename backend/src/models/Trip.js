const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');
const Driver = require('./Driver'); // Assuming Driver model is similarly created

const Trip = sequelize.define('Trip', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  source: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  cargoWeight: { type: DataTypes.INTEGER, allowNull: false },
  status: { 
    type: DataTypes.ENUM('Draft', 'Dispatched', 'Completed', 'Cancelled'), 
    defaultValue: 'Draft' 
  }
});

// Relational Modeling (Odoo points)
Trip.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
Trip.belongsTo(Driver, { foreignKey: 'driverId' });

module.exports = Trip;