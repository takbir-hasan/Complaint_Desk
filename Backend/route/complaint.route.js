import express from 'express';
// import {complaint} from "../controller/complaint.controller.js";
import { complaint, getComplaintsByDept,discardComplaint, getDiscardedComplaintsByDept, markComplaintAsPending, markComplaintAsSolved, getPendingComplaintBycdept} from "../controller/complaint.controller.js"; 

const router = express.Router();

router.post("/",complaint)
router.get('/:cdept', getComplaintsByDept);
router.get('/discarded/:cdept', getDiscardedComplaintsByDept);
router.put('/:id', discardComplaint);
router.put('/pending/:id', markComplaintAsPending);
// router.get('/pending/:id', getPendingComplaints)
router.get('/pendingsolve/:cdept', getPendingComplaintBycdept);
router.put('/solved/:id',markComplaintAsSolved);

export default router;
