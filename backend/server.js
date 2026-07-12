const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for Hackathon Testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'TransitOps API is running natively!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TransitOps Command Center active on port ${PORT}`);
});