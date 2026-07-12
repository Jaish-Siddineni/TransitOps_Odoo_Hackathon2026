const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');

// Import Models
const User = require('./src/models/User');
const Role = require('./src/models/Role');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const vehicleRoutes = require('./src/routes/vehicleRoutes');
const driverRoutes = require('./src/routes/driverRoutes');
const maintenanceRoutes = require('./src/routes/maintenanceRoutes');
const tripRoutes = require('./src/routes/tripRoutes');
const financeRoutes = require('./src/routes/financeRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log("✅ Database Connected");

        // Print current database
        const [db] = await sequelize.query("SELECT DATABASE() AS db");
        console.log("Connected Database:", db[0].db);

        // Print User model attributes
        console.log("User Model Columns:");
        console.log(Object.keys(User.rawAttributes));

        // Sync models
        await sequelize.sync({ alter: true });

        console.log("✅ Database synchronized successfully.");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error("❌ Startup Error:", err);
    }
}

startServer();