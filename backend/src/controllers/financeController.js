const financeService = require('../services/financeService');
const generateCSV = require('../utils/csvExporter');

const getVehicleROI = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { revenue } = req.query; // e.g., ?revenue=150000
    
    const roiData = await financeService.calculateVehicleROI(vehicleId, parseFloat(revenue || 0));
    res.status(200).json(roiData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const exportROIReport = async (req, res) => {
  try {
    // Mocking the data array for hackathon speed
    const data = [{ vehicleRegNo: 'KA-01', ROI: '25%' }]; 
    const csv = generateCSV(data, ['vehicleRegNo', 'ROI']);
    
    res.header('Content-Type', 'text/csv');
    res.attachment('ROI_Report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
};

module.exports = { getVehicleROI, exportROIReport };