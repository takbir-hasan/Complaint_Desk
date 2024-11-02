import express from 'express';
import { verifyTeacherById,updateAssignedCommitteeTeacherById,deleteTeacherById, getAssignedTeachersByPosition, getTeacherByDepartment, getTeacherByEmail, updatePosition, updatePositionByDepartment, updateTeacherProfile, getTeacherNamesByDepartment} from '../controller/teacher.controller.js';
const router = express.Router();
import { AdminLogin, TeacherLogin } from '../middlewares/checkLogin.js';

// Route to get a specific teacher by email
router.get('/:email', TeacherLogin, getTeacherByEmail);
router.put('/api/updateTeacherProfile/:email', TeacherLogin, updateTeacherProfile);
router.get('/api/getAllteacherByDeparment/:dept', TeacherLogin, getTeacherByDepartment);
router.put('/api/updatePosition', AdminLogin, updatePosition);
router.get('/api/getAssignedTeachers',AdminLogin, getAssignedTeachersByPosition);
router.patch('/api/updatePositionByDepartment', AdminLogin, updatePositionByDepartment);
router.delete('/api/teacherDeleteById/:id', TeacherLogin, deleteTeacherById);
router.put('/api/updateAssignedCommitteeTeacherById/:id', TeacherLogin,  updateAssignedCommitteeTeacherById);
router.put('/api/verifyTeacherById/:teacherId', TeacherLogin, verifyTeacherById);
router.get('/names/:dept', AdminLogin, getTeacherNamesByDepartment);
// router.get('/api/getAllteacher', AdminLogin, getAllTeacherNames);
export default router;
