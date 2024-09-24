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

dotenv.config();

const app = express();
app.use(cors());
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

app.use('/complaint/:cdept',comSubmit);
app.use('/complaint/:id',comSubmit);
app.use('/complaint/discarded/:cdept',comSubmit);

// Catch-all route for serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
