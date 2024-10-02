import express from 'express';
import { getTeacherByEmail } from '../controller/teacher.controller.js';
const router = express.Router();

// Route to get a specific teacher by email
router.get('/:email', getTeacherByEmail);

export default router;