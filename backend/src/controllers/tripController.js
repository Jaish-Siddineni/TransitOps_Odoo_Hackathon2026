const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const sequelize = require('../config/database');

// Added for the React Dashboard!
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const dispatchTrip = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { source, destination, cargoWeight, vehicleId, driverId } = req.body;

    const vehicle = await Vehicle.findByPk(vehicleId);
    const driver = await Driver.findByPk(driverId);

    if (!vehicle || vehicle.status !== 'Available') throw new Error('Vehicle unavailable');
    if (!driver || driver.status !== 'Available') throw new Error('Driver unavailable');
    if (cargoWeight > vehicle.capacity) throw new Error(`Weight exceeds ${vehicle.capacity}kg max capacity`);

    const trip = await Trip.create(
      { source, destination, cargoWeight, vehicleId, driverId, status: 'Dispatched' },
      { transaction: t }
    );

    await vehicle.update({ status: 'On Trip' }, { transaction: t });
    await driver.update({ status: 'On Trip' }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Trip Dispatched Successfully', trip });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

const completeTrip = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const trip = await Trip.findByPk(req.params.id);
    if (!trip || trip.status !== 'Dispatched') throw new Error('Invalid trip state');

    await Vehicle.update({ status: 'Available' }, { where: { id: trip.vehicleId }, transaction: t });
    await Driver.update({ status: 'Available' }, { where: { id: trip.driverId }, transaction: t });
    
    await trip.update({ status: 'Completed' }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Trip Completed. Assets are now available.' });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

// Make sure ALL THREE are exported here
module.exports = { getAllTrips, dispatchTrip, completeTrip };