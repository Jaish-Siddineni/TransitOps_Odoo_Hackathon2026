const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

const sendLicenseReminder = async (driverEmail, driverName, expiryDate) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: driverEmail,
    subject: '⚠️ URGENT: Driver License Expiring Soon',
    text: `Hello ${driverName},\nYour license expires on ${expiryDate}. Please renew immediately.`
  });
};

module.exports = sendLicenseReminder;