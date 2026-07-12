/**
 * Formats a number into Indian Rupee currency standard
 * @param {number} amount 
 * @returns {string} e.g., ₹1,50,000
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
};

/**
 * Formats a standard ISO date string into a readable format
 * @param {string} dateString 
 * @returns {string} e.g., 12 Jul 2026
 */
export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

/**
 * Calculates ROI percentage
 */
export const calculateROI = (revenue, operationalCost, acquisitionCost) => {
  if (acquisitionCost === 0) return 0;
  return (((revenue - operationalCost) / acquisitionCost) * 100).toFixed(2);
};