import express from 'express';
import { feedback } from "../controller/feedback.controller.js"; 

const router = express.Router();

router.post("/",feedback);


export default router;
