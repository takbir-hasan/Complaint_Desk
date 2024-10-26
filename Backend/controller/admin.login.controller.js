import Admin from "../model/admin.model.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config(); 

export const admin = async (req, res) => { //login
      try {
          const { email, password } = req.body;
          const checkMail = await Admin.findOne({ email });
  
          if (checkMail) {
              if (await bcrypt.compare(password, checkMail.password)) {
                 //Generate JWT Token
                 const token = jwt.sign(
                  { id: checkMail.id, email: checkMail.email }, // Payload
                  process.env.SECRET_KEY, // Secret key
                  { expiresIn: '1y' } // Token expiration time
                );

                return res.status(201).json({ "access_token": token,
                });
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

     // Send reset email with token
     const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

     const message = `
           <h1>You requested a password reset</h1>
           <p>Please click the following link to reset your password:</p>
           <a href="${resetUrl}">Reset Password</a> 
       `;

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
     html: message,
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
      return res.status(404).send({ message: "User not found."});
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
      email:user.email,
    });

  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).send({ message: 'Something went wrong.' }); // Avoid exposing details in production
  }
};

export const updatePass = async (req, res) => {
  try {
    const { email, oldPass, newPass } = req.body;

          const checkMail = await Admin.findOne({ email });

              if (await bcrypt.compare(oldPass, checkMail.password)) {

                if (!newPass || newPass.length < 8) {
                  return res.status(400).send({
                    message: "Please provide a password with at least 8 characters.",
                  });
                }
                
    // Hash password securely
    const hashedPassword = await bcrypt.hash(newPass, 10); // Adjust salt rounds as needed

    // Update user password
    checkMail.password = hashedPassword;
    await checkMail.save();

    // Send success response
    return res.status(200).send({
      message: "Password Change successful.",
      status: 'success',
    });

              } else {
                  return res.status(401).json({ message: 'Incorrect old password.' });
              }


  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).send({ message: 'Something went wrong.' }); // Avoid exposing details in production
  }
};