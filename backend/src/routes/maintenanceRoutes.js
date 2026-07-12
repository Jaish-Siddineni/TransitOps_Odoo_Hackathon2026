const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/rbacMiddleware');

// Only Fleet Managers can log maintenance
router.post('/', authenticate, authorize(['FLEET_MANAGER']), maintenanceController.logMaintenance);

module.exports = router;