import express from 'express';
// import {complaint} from "../controller/complaint.controller.js";
import { complaint, getComplaintsByDept, deleteAndDiscardComplaint, getDiscardedComplaintsByDept } from "../controller/complaint.controller.js"; 

const router = express.Router();

router.post("/",complaint)
router.get('/:cdept', getComplaintsByDept);
router.delete('/:id', deleteAndDiscardComplaint);
router.get('/discardedcomplaints/:cdept', getDiscardedComplaintsByDept);

export default router;
