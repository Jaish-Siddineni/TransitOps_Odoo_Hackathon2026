const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/rbacMiddleware');

// Only Financial Analysts and Fleet Managers handle money
router.post('/fuel', authenticate, authorize(['FINANCIAL_ANALYST', 'FLEET_MANAGER']), expenseController.addFuelLog);
router.post('/other', authenticate, authorize(['FINANCIAL_ANALYST', 'FLEET_MANAGER']), expenseController.addExpense);

module.exports = router;