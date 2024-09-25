import Admin from "../model/admin.model.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config(); 

export const admin = async (req, res) => {
      try {
          const { email, password } = req.body;
          const checkMail = await Admin.findOne({ email });
  
          if (checkMail) {
              if (await bcrypt.compare(password, checkMail.password)) {
                  res.json({ });
              } else {
                  return res.status(401).json({ message: 'Incorrect email or password.' });
              }
          } else {
              return res.status(401).json({ message: 'User not found.' });
          }
      } catch (error) {
          console.error('Error logging in:', error);
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  };


export const adminforgetpass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Please provide your email address." });
    }

    const checkUser = await Admin.findOne({ email });

    if (!checkUser) {
      return res.status(400).send({ message: "User not found. It seems you're not an admin." });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME, // Use environment variable
        pass: process.env.EMAIL_PASSWORD, // Use environment variable
      },
    });

    const   
 receiver = {
      from: "passwordreset@complaintdesk.com",
      to: email,
      subject: "Password Reset Request",
      text: `Click on this link to generate your new password: ${process.env.CLIENT_URL}reset-password/${token}`,
    };

    // Sending email
    await transporter.sendMail(receiver);

    // Responding after successful email send
    return res.status(200).send({
      message: "Password reset link is sent successfully to your email.",
      status: 'success',
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({
      message: 'Something went wrong.',
      error: 'An unexpected error occurred.', 
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate password
    if (!password || password.length < 8) {
      return res.status(400).send({
        message: "Please provide a password with at least 8 characters.",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).send({ message: "Invalid or expired token." });
    }

    // Find user by email from decoded token
    const user = await Admin.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Send success response
    return res.status(200).send({
      message: "Password reset successful. Login to your account.",
      status: 'success',
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).send({ message: 'Something went wrong.' }); // Avoid exposing details in production
  }
};