const MaintenanceLog = require('../models/MaintenanceLog');
const Vehicle = require('../models/Vehicle');
const sequelize = require('../config/database');

const logMaintenance = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { vehicleId, issueDescription, cost } = req.body;

    // 1. Create the log
    const log = await MaintenanceLog.create(
      { vehicleId, issueDescription, cost },
      { transaction: t }
    );

    // 2. Automatically update vehicle status to hide it from dispatch
    await Vehicle.update(
      { status: 'In Shop' },
      { where: { id: vehicleId }, transaction: t }
    );

    await t.commit();
    res.status(201).json({ message: 'Maintenance logged, vehicle moved to In Shop', log });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};

module.exports = { logMaintenance };