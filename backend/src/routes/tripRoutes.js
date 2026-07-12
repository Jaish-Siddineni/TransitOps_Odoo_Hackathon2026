const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/rbacMiddleware');

// Only Fleet Managers and Drivers can dispatch trips
router.post(
  '/dispatch', 
  authenticate, 
  authorize(['FLEET_MANAGER', 'DRIVER']), 
  tripController.createDispatch
);

module.exports = router;