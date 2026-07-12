const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Notice the added '/src' in all of these paths!
const sequelize = require('./src/config/database');

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const maintenanceRoutes = require('./src/routes/maintenanceRoutes');
const tripRoutes = require('./src/routes/tripRoutes'); 
const financeRoutes = require('./src/routes/financeRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');

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
sequelize.sync({ alter: true }) 
  .then(() => {
    console.log('✅ MySQL Database Synchronized');
    app.listen(PORT, () => console.log(`🚀 TransitOps API running on port ${PORT}`));
  })
  .catch(err => console.error('❌ Database connection error:', err));