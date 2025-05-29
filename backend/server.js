const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// Placeholder to store OTP temporarily - in production store securely with expiry etc.
let currentOtp = null;

app.post('/api/admin/login', async (req, res) => {
  const { email } = req.body;

  if (email === process.env.DOCTOR_EMAIL) {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP email
  const mailOptions = {
  from: `"Wellness Center" <${process.env.NODEMAILER_USER}>`,
  to: email,
  subject: 'Your One-Time Password (OTP) for Login',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #4CAF50; text-align: center;">Welcome to Wellness Center</h2>
      <p>Dear Doctor,</p>
      <p>You requested to log in. Please use the One-Time Password (OTP) below to proceed:</p>
      <div style="width: 100%; background-color: #f2f2f2; padding: 15px; margin: 20px 0; font-size: 24px; font-weight: bold; text-align: center; border-radius: 8px; color: #333;">
        ${otp}
      </div>
      <p>This OTP is valid for the current session and will expire after one use.</p>
      <p>If you did not request this login, you can safely ignore this email.</p>
      <br>
      <p>Regards,<br><strong>Wellness Center Team</strong></p>
    </div>
  `
};



    try {
      await transporter.sendMail(mailOptions);
      currentOtp = otp; // store OTP for validation
      return res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Error sending mail:', error);
      return res.status(500).json({ message: 'Error sending OTP' });
    }
  } else {
    return res.status(400).json({ message: 'Invalid email' });
  }
});

app.post('/api/admin/verify-otp', (req, res) => {
  const { otp } = req.body;

  if (!currentOtp) {
    return res.status(400).json({ message: 'No OTP generated, please login again' });
  }

  if (otp === currentOtp) {
    // OTP correct - generate JWT token
    const token = jwt.sign(
      { role: 'doctor', email: process.env.DOCTOR_EMAIL },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );
    currentOtp = null; // clear OTP after successful use
    return res.status(200).json({ message: 'OTP verified successfully', token });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
