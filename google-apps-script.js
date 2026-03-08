/**
 * Google Apps Script for BYU Sunny Side Wellness
 * 
 * Setup:
 * 1. Create a Google Sheet with columns: Timestamp, Name, Email, Q1, Q2, Q3, Q4
 * 2. Extensions → Apps Script
 * 3. Paste this code and save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into VITE_SHEETS_URL in .env
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.q1 || '',
      data.q2 || '',
      data.q3 || '',
      data.q4 || '',
    ]);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
