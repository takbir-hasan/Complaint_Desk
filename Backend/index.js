import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';


import comSubmit from './route/complaint.route.js';
import check from './route/check.route.js';
import info from './route/info.route.js';
import feedback from './route/feedback.route.js';
import donate from './route/donation.route.js';
import Donation from './model/donation.model.js';
import admin from './route/admin.login.route.js';
import teacherRoutes from './route/teacher.route.js';
import StudentRoutes from './route/student.route.js';
// import {checkLogin, AdminLogin, TeacherLogin} from './middlewares/checkLogin.js';

import { adminforgetpass, resetPassword, updatePass } from './controller/admin.login.controller.js';
import { register, login, forgetPass, resetPass, verification, getTeacherByEmail} from './controller/teacher.controller.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));

const port = process.env.PORT || 3000;
const URI = process.env.MongoDB;

// To parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Correctly handle async connection to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));



// Path setup for serving static files and React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../Frontend/dist')));


// API routes
app.use('/complaint', comSubmit);
app.use('/check', check);
app.use('/info', info);
app.use('/feedback', feedback);
app.use('/donor', donate);
app.use('/adminlog',admin)
app.use('/adminforgetpass',adminforgetpass)
app.use('/reset',resetPassword)
app.post('/adminchangepass',updatePass)
app.use('/complaint/:cdept',comSubmit);
app.use('/complaint/:id',comSubmit);
app.use('/complaint/discarded/:cdept',comSubmit);
app.post('/register',register);
app.post('/login',login);
app.post('/forgetPass',forgetPass);
app.post('/reset-pass',resetPass);
app.post('/verify',verification);
app.use('/teacher',teacherRoutes);
app.use('/student',StudentRoutes);


// Default Error Handler
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err); // Log the error for debugging

  // Set default status code if not already set
  res.status(err.status || 500);

  // Send a structured error response
  res.json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Include stack trace in development mode
  });
};
// Use the error handler middleware
app.use(errorHandler);


// donation
app.post('/donation', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});
app.post('/fail/:transactionId', async (req, res) => {
  await Donation.updateOne({ _id: req.params.transactionId }, { $set: { status: "failed" } });
  res.redirect(`${process.env.CLIENT_URL}/done/${'fail'}`);
});
app.post('/done/:condition', (req,res)=>{
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});
 

// Catch-all route for serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});



// Start the server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
