import express from 'express';

import { complaint, getComplaintsByDept,discardComplaint, getDiscardedComplaintsByDept, markComplaintAsPending, markComplaintAsSolved, getPendingComplaintBycdept, getComplaintByStudentId} from "../controller/complaint.controller.js"; 

const router = express.Router();

router.post("/",complaint)
router.get('/:cdept', getComplaintsByDept);
router.get('/discarded/:cdept', getDiscardedComplaintsByDept);
router.put('/:id', discardComplaint);
router.put('/pending/:id', markComplaintAsPending);
router.get('/pendingsolve/:cdept', getPendingComplaintBycdept);
router.put('/solved/:id',markComplaintAsSolved);
router.get('/complaintByStudentId/:id', getComplaintByStudentId);

export default router;
