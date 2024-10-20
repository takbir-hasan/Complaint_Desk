import express from 'express';
import { register, login, verification, forgetPass, resetPass } from '../controller/student.controller.js';
const router = express.Router();

// Route to get a specific teacher by email
router.get('/register', register);
router.put('/login',login);
router.get('/verification',verification);
router.put('/forgetPass', forgetPass);
router.get('/resetPass',resetPass);

export default router;