const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

const dispatchTrip = async (tripData) => {
  const { source, destination, cargoWeight, vehicleId, driverId } = tripData;

  // 1. Fetch relations
  const vehicle = await Vehicle.findByPk(vehicleId);
  const driver = await Driver.findByPk(driverId);

  // 2. Strict Validations (Odoo requirement)
  if (!vehicle || vehicle.status !== 'Available') {
    throw new Error('Selected vehicle is not available.');
  }
  if (!driver || driver.status !== 'Available') {
    throw new Error('Selected driver is not available or is suspended.');
  }
  if (cargoWeight > vehicle.capacity) {
    throw new Error(`Cargo exceeds max capacity of ${vehicle.capacity}kg.`);
  }

  // 3. Database Transaction (Ensures all or nothing updates)
  const sequelize = require('../config/database');
  const t = await sequelize.transaction();

  try {
    const trip = await Trip.create({
      source, destination, cargoWeight, vehicleId, driverId, status: 'Dispatched'
    }, { transaction: t });

    await vehicle.update({ status: 'On Trip' }, { transaction: t });
    await driver.update({ status: 'On Trip' }, { transaction: t });

    await t.commit();
    return trip;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = { dispatchTrip };