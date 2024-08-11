const express = require('express');
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');
const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const newOTP = new OTP({ email, otp });
  await newOTP.save();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('OTP sent');
  });
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = await OTP.findOne({ email, otp });

  if (record) {
    return res.status(200).send('OTP verified');
  } else {
    return res.status(400).send('Invalid OTP');
  }
});

module.exports = router;
