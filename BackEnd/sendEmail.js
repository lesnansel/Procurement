const nodemailer = require('nodemailer');

/**
 * Send an email notification.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email body (plain text)
 * @param {string} html - Email body (HTML)
 * @returns {Promise}
 */
async function sendEmail({ to, subject, text, html }) {
  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for 587
    auth: {
      user: 'procurementko@gmail.com', // your Gmail address
      pass: 'jzipypcixjmeszmw' // Gmail app password, NOT your regular password
    }
  });

  const mailOptions = {
    from: '"GovProcure" <procurementko@gmail.com>',
    to,
    subject,
    text,
    html
  };

  return transporter.sendMail(mailOptions);
}

// Example usage:
// sendEmail({
//   to: 'recipient@example.com',
//   subject: 'Invitation Notification',
//   text: 'You have a new invitation.',
//   html: '<b>You have a new invitation.</b>'
// }).then(() => console.log('Email sent!')).catch(console.error);

module.exports = sendEmail;
