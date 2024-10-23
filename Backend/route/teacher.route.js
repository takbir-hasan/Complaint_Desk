import express from 'express';
import { verifyTeacherById,updateAssignedCommitteeTeacherById,deleteTeacherById, getAssignedTeachersByPosition, getTeacherByDepartment, getTeacherByEmail, updatePosition, updatePositionByDepartment, updateTeacherProfile, getTeacherNamesByDepartment} from '../controller/teacher.controller.js';
const router = express.Router();

// Route to get a specific teacher by email
router.get('/:email', getTeacherByEmail);
router.put('/api/updateTeacherProfile/:email',updateTeacherProfile);
router.get('/api/getAllteacherByDeparment/:dept',getTeacherByDepartment);
router.put('/api/updatePosition', updatePosition);
router.get('/api/getAssignedTeachers',getAssignedTeachersByPosition);
router.patch('/api/updatePositionByDepartment',updatePositionByDepartment);
router.delete('/api/teacherDeleteById/:id',deleteTeacherById);
router.put('/api/updateAssignedCommitteeTeacherById/:id', updateAssignedCommitteeTeacherById);
router.put('/api/verifyTeacherById/:teacherId', verifyTeacherById);
router.get('/names/:dept', getTeacherNamesByDepartment);
export default router;