import express from 'express';
import { feedback, getFeedback } from "../controller/feedback.controller.js"; 
import {AdminLogin} from '../middlewares/checkLogin.js';  
const router = express.Router();

router.post("/",feedback);
router.get('/getFeedback', AdminLogin, getFeedback);

export default router;
