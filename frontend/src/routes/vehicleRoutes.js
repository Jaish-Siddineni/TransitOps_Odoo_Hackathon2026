const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/rbacMiddleware');

// All authenticated users can view vehicles
router.get('/', authenticate, vehicleController.getAllVehicles);

// Only Fleet Managers can add new vehicles
router.post('/', authenticate, authorize(['FLEET_MANAGER']), vehicleController.createVehicle);

module.exports = router;