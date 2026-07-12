const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

// Route: GET /api/finance/roi/:vehicleId
router.get('/roi/:vehicleId', financeController.getVehicleROI);

// Route: GET /api/finance/export/csv
router.get('/export/csv', financeController.exportROIReport);

module.exports = router;
