const PDFDocument = require('pdfkit');

const generatePDFReport = (res, reportTitle, dataText) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${reportTitle}.pdf`);
  
  doc.pipe(res);
  doc.fontSize(20).text(reportTitle, { align: 'center' }).moveDown();
  doc.fontSize(12).text(dataText);
  doc.end();
};

module.exports = generatePDFReport;