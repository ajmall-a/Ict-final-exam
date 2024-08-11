const express = require('express');
const nodemailer = require('nodemailer');
const OTP = require('../models/Otp'); // Ensure the correct path
require('dotenv').config(); // Load environment variables

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email) {
    return res.status(400).send('Email is required');
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Save OTP to the database
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Configure the mail transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error); // Log the error
        return res.status(500).send('Error sending email');
      }
      res.status(200).send('OTP sent');
    });

  } catch (error) {
    console.error('Error in send-otp route:', error); // Log the error
    res.status(500).send('Internal server error');
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send('Email and OTP are required');
  }

  try {
    // Find the OTP record
    const record = await OTP.findOne({ email, otp });

    if (record) {
      return res.status(200).send('OTP verified');
    } else {
      return res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    console.error('Error in verify-otp route:', error); // Log the error
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
