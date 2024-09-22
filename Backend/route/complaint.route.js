import express from 'express';
// import {complaint} from "../controller/complaint.controller.js";
import { complaint, getComplaintsByDept } from "../controller/complaint.controller.js"; 

const router = express.Router();

router.post("/",complaint)
router.get('/:cdept', getComplaintsByDept);

export default router;
