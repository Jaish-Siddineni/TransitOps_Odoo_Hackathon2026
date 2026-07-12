const FuelLog = require('../models/FuelLog');
const Expense = require('../models/Expense');

const addFuelLog = async (req, res) => {
  try {
    const { vehicleId, liters, cost, date } = req.body;
    const log = await FuelLog.create({ vehicleId, liters, cost, date });
    res.status(201).json({ message: 'Fuel logged successfully', log });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const { vehicleId, type, amount, description, date } = req.body;
    const expense = await Expense.create({ vehicleId, type, amount, description, date });
    res.status(201).json({ message: 'Expense logged successfully', expense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addFuelLog, addExpense };