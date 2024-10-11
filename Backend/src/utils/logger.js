import Log from '../models/AdminLog.model.js';
import nodemailer from 'nodemailer';

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Log an action performed by a user and send an email notification
export const logActivity = async (userId, action) => {
  try {
    // Log the activity in the database
    await Log.create({ userId, action });
    console.log(`Logged action: ${action} by user ${userId}`);

    // Send an email notification
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: 'singhchinmay207@gmail.com', // Admin email or whoever should receive the notification
      subject: 'New Activity Logged',
      text: `User ID: ${userId}\nAction: ${action}\nTime: ${new Date()}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error('Error sending email:', error);
      }
      console.log('Email sent:', info.response);
    });

  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
