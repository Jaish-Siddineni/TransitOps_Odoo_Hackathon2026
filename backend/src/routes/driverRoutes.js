const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbacMiddleware");

// All authenticated users can view drivers
router.get("/", authenticate, driverController.getAllDrivers);

// Only Safety Officers and Fleet Managers can add/manage drivers
router.post(
  "/",
  authenticate,
  authorize(["SAFETY_OFFICER", "FLEET_MANAGER"]),
  driverController.createDriver,
);

module.exports = router;
