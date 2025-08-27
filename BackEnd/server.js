const express = require('express');
const sendPRStatusEmail = require('./emailNotification');
const app = express();

app.use(express.json());

// Single unified route for sending PR status emails
app.post('/send-pr-status-email', async (req, res) => {
  const { email, prNumber, newStatus } = req.body;
  try {
    await sendPRStatusEmail({ to: email, prNumber, newStatus });
    res.json({ success: true, message: 'PR status email sent!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
