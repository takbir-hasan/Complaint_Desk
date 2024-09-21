import express from 'express';
import {complaint} from "../controller/complaint.controller.js";

const router = express.Router();

router.post("/",complaint)

export default router;
