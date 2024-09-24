import express from 'express';
import { feedback, getFeedback } from "../controller/feedback.controller.js"; 

const router = express.Router();

router.post("/",feedback);
router.get('/getFeedback',getFeedback);

export default router;
