const express = require('express');
const mongoose = require('mongoose');
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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

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
  const {email} = req.body;

  if (email === process.env.DOCTOR_EMAIL) {
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send OTP email
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      currentOtp = otp; // store OTP for validation
      return res.status(200).json({message: 'OTP sent to your email'});
    } catch (error) {
      console.error('Error sending mail:', error);
      return res.status(500).json({message: 'Error sending OTP'});
    }
  } else {
    return res.status(400).json({message: 'Invalid email'});
  }
});

app.post('/api/admin/verify-otp', (req, res) => {
  const {otp} = req.body;

  if (!currentOtp) {
    return res.status(400).json({message: 'No OTP generated, please login again'});
  }

  if (otp === currentOtp) {
    // OTP correct - generate JWT token
    const token = jwt.sign(
      {role: 'doctor', email: process.env.DOCTOR_EMAIL},
      process.env.JWT_SECRET || 'secretkey',
      {expiresIn: '1h'}
    );
    currentOtp = null; // clear OTP after successful use
    return res.status(200).json({message: 'OTP verified successfully', token});
  } else {
    return res.status(400).json({message: 'Invalid OTP'});
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

