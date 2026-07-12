const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const driverRoutes = require('./routes/driverRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const tripRoutes = require('./routes/tripRoutes'); 
const financeRoutes = require('./routes/financeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;

// Sync Database and Start Server
sequelize.sync({ alter: true }) // Auto-updates MySQL tables during hackathon dev
  .then(() => {
    console.log(' MySQL Database Synchronized');
    app.listen(PORT, () => console.log(`🚀 TransitOps API running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));