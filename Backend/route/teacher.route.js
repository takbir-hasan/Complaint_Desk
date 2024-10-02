import express from 'express';
import { getTeacherByEmail, updateTeacherProfile } from '../controller/teacher.controller.js';
const router = express.Router();

// Route to get a specific teacher by email
router.get('/:email', getTeacherByEmail);
router.put('/api/updateTeacherProfile/:email',updateTeacherProfile);

export default router;