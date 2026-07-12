const tripService = require('../services/tripService');

const createDispatch = async (req, res) => {
  try {
    const trip = await tripService.dispatchTrip(req.body);
    res.status(201).json({ message: 'Trip dispatched successfully', trip });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createDispatch };