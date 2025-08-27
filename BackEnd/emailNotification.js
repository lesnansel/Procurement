const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Send notification email when PR status changes.
 * @param {string} to - Recipient email address
 * @param {string} prNumber - PR number or reference
 * @param {string} newStatus - New status of the PR
 */
async function sendPRStatusEmail({ to, prNumber, newStatus }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const subject = `PR ${prNumber} Status Updated`;
  const text = `Your Purchase Request (${prNumber}) status has changed to: ${newStatus}`;
  const html = `<p>Your Purchase Request (<b>${prNumber}</b>) status has changed to: <b>${newStatus}</b></p>`;

  await transporter.sendMail({
    from: `"GovProcure" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html
  });
}

module.exports = sendPRStatusEmail;
