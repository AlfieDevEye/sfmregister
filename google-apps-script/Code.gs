/**
 * Deploy this as a Google Apps Script Web App. See README.md for setup.
 */
const SHEET_NAME = 'Registrations';
const HEADERS = ['Registration ID', 'Name', 'Email', 'WhatsApp', 'Location', 'Gender', 'Age', 'Profession', 'Interests', 'Business', 'Expectations', 'Challenge', 'Topic', 'Attendance Status', 'Attendance Likelihood', 'Future Events', 'Referral Source', 'Referred By', 'Community Interest', 'Collaboration Interest', 'Updates', 'Contact Preference', 'Additional Notes', 'Registration Date'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    // This script is bound to the registration spreadsheet through Extensions → Apps Script.
    // Using the active spreadsheet avoids a spreadsheet ID being left as a placeholder.
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const id = 'SFM-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd') + '-' + Math.floor(1000 + Math.random() * 9000);
    sheet.appendRow([
      id, data.name, data.email, data.phone, data.location, data.gender, data.ageRange,
      data.role, join(data.interests), data.business, join(data.gains), data.challenge,
      data.topic, data.attendance, data.likelihood, data.futureEvents, data.referral,
      data.referredBy, data.community, join(data.collaboration), data.updates,
      join(data.contact), data.extra, new Date()
    ]);
    // A temporary email quota or permission issue must not discard a valid registration.
    try {
      sendConfirmation(data, id);
    } catch (mailError) {
      console.error('Registration saved, but confirmation email failed: ' + mailError.message);
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true, registrationId: id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function join(value) { return Array.isArray(value) ? value.join(', ') : value || ''; }

function sendConfirmation(data, id) {
  const firstName = (data.name || 'there').split(' ')[0];
  const subject = 'We received your SFM Conference 2026 registration';
  const htmlBody = `<div style="font-family:Arial,sans-serif;color:#090f11;max-width:580px;margin:auto">
    <div style="border-top:8px solid #f44b5c;padding:28px 0 10px"><strong style="font-size:28px;color:#48006a">sfm<span style="color:#f44b5c">.</span></strong></div>
    <h1 style="font-size:28px">You’re on the list, ${firstName}.</h1>
    <p>Thank you for registering your interest in <strong>SFM Conference 2026</strong>.</p>
    <p>Your registration reference is <strong>${id}</strong>. If you secure a place, the SFM team will contact you with the next steps. If you have joined the waitlist, we will notify you if further places become available.</p>
    <p>Stay connected for announcements, speakers, opportunities and conference updates.</p>
    <p style="color:#48006a;font-weight:bold">Strategy. Finance. Marketing.</p>
  </div>`;
  MailApp.sendEmail({ to: data.email, subject, htmlBody, name: 'SFM Conference' });
}
