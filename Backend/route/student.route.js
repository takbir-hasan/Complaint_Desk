import express from 'express';
import { register, login, verification, forgetPass, resetPass } from '../controller/student.controller.js';
const router = express.Router();

// Route to get a specific teacher by email
router.post('/register', register);
router.post('/login',login);
router.post('/verification',verification);
router.post('/forgetPass', forgetPass);
router.post('/resetPass',resetPass);

export default router;