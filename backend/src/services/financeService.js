const Vehicle = require('../models/Vehicle');
const FuelLog = require('../models/FuelLog');
const MaintenanceLog = require('../models/MaintenanceLog');
const Expense = require('../models/Expense');

const calculateVehicleROI = async (vehicleId, estimatedRevenue) => {
  const vehicle = await Vehicle.findByPk(vehicleId);
  if (!vehicle) throw new Error('Vehicle not found');

  // MySQL native aggregations
  const totalFuel = await FuelLog.sum('cost', { where: { vehicleId } }) || 0;
  const totalMaint = await MaintenanceLog.sum('cost', { where: { vehicleId } }) || 0;
  const totalExpenses = await Expense.sum('amount', { where: { vehicleId } }) || 0;
  
  const operationalCost = totalFuel + totalMaint + totalExpenses;
  
  let roi = 0;
  if (vehicle.acquisitionCost > 0) {
    roi = ((estimatedRevenue - operationalCost) / vehicle.acquisitionCost) * 100;
  }

  return {
    vehicleRegNo: vehicle.regNo,
    acquisitionCost: vehicle.acquisitionCost,
    operationalCost,
    estimatedRevenue,
    roiPercentage: parseFloat(roi.toFixed(2))
  };
};

module.exports = { calculateVehicleROI };