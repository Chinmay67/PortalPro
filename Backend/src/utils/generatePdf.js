import PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Manually define __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

export const generatePDF = async (customer) => {
  const pdfPath = join(__dirname, `../../pdfs/customer_${customer.id}.pdf`);

  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe its output to a file
  const pdfFile = createWriteStream(pdfPath);
  doc.pipe(pdfFile);

  // Add title
  doc.fontSize(25).text('Customer Details', { align: 'center' }).moveDown();

  // Create a table header
  const tableTop = 150;
  const itemColumn = 50;
  const descriptionColumn = 200;
  const rowHeight = 30;
  const columnWidth = 300;
  const rowGap = 5;

  // Table Header
  doc
    .fontSize(14)
    .text('Field', itemColumn, tableTop)
    .text('Value', descriptionColumn, tableTop);

  // Draw a horizontal line under the header
  doc.moveTo(50, tableTop + 20).lineTo(550, tableTop + 20).stroke();

  // Function to draw a row
  const drawRow = (y, field, value) => {
    doc
      .fontSize(12)
      .text(field, itemColumn, y)
      .text(value, descriptionColumn, y);

    // Draw a line under each row
    doc.moveTo(50, y + 20).lineTo(550, y + 20).stroke();
  };

  // Add rows for each customer field
  let rowY = tableTop + 30;
  drawRow(rowY, 'Name', customer.name);
  rowY += rowHeight + rowGap;
  drawRow(rowY, 'Email', customer.email);
  rowY += rowHeight + rowGap;
  drawRow(rowY, 'Phone', customer.phone);
  rowY += rowHeight + rowGap;
  drawRow(rowY, 'Age', customer.age);
  rowY += rowHeight + rowGap;
  drawRow(rowY, 'Gender', customer.gender);

  // Finalize the PDF and end the stream
  doc.end();

  return `http://localhost:5000/pdfs/customer_${customer.id}.pdf`;  // Return the PDF URL
};
