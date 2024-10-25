import express from 'express';
import { register, login, verification, forgetPass, resetPass, getStudentById, updateStudentById, getStudentsByDept, updateStudentStatus, deleteStudentById } from '../controller/student.controller.js';
const router = express.Router();
import checkLogin from '../middlewares/checkLogin.js';

// Route to get a specific teacher by email
router.post('/register', register);
router.post('/login',login);
router.post('/verification',verification);
router.post('/forgetPass', forgetPass);
router.post('/resetPass',resetPass);

router.get('/api/getStudentByID/:id',checkLogin, getStudentById); //added middleware for Unuthorized
router.put('/api/updateStudentByID/:id', checkLogin, updateStudentById); //added middleware for Unuthorized
router.put('/api/updateStudentStatusById/:id', updateStudentStatus);
router.delete('/api/deleteStudentById/:id', deleteStudentById);
router.get('/api/getStudentsByDept/:dept', getStudentsByDept);

export default router;