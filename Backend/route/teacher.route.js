import express from 'express';
import { getAssignedTeachersByPosition, getTeacherByDepartment, getTeacherByEmail, updatePosition, updatePositionByDepartment, updateTeacherProfile } from '../controller/teacher.controller.js';
const router = express.Router();

// Route to get a specific teacher by email
router.get('/:email', getTeacherByEmail);
router.put('/api/updateTeacherProfile/:email',updateTeacherProfile);
router.get('/api/getAllteacherByDeparment',getTeacherByDepartment);
router.put('/api/updatePosition', updatePosition);
router.get('/api/getAssignedTeachers',getAssignedTeachersByPosition);
router.patch('/api/updatePositionByDepartment',updatePositionByDepartment);

export default router;