const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/rbacMiddleware');

// Get all trips (Used by the Dashboard KPIs)
router.get('/', authenticate, tripController.getAllTrips);

// Create and Dispatch a trip
router.post('/dispatch', authenticate, authorize(['FLEET_MANAGER', 'DRIVER']), tripController.dispatchTrip);

// Complete a trip
router.put('/:id/complete', authenticate, authorize(['DRIVER', 'FLEET_MANAGER']), tripController.completeTrip);

module.exports = router;