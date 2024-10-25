import express from 'express';

import { complaint, getComplaintsByDept,discardComplaint, getDiscardedComplaintsByDept, markComplaintAsPending, markComplaintAsSolved, getPendingComplaintBycdept, getComplaintByStudentId} from "../controller/complaint.controller.js"; 
import {checkLogin, TeacherLogin} from '../middlewares/checkLogin.js';
const router = express.Router();

router.post("/", checkLogin, complaint)
router.get('/:cdept',TeacherLogin, getComplaintsByDept);
router.get('/discarded/:cdept',TeacherLogin, getDiscardedComplaintsByDept);
router.put('/:id',TeacherLogin, discardComplaint);
router.put('/pending/:id',TeacherLogin, markComplaintAsPending);
router.get('/pendingsolve/:cdept',TeacherLogin, getPendingComplaintBycdept);
router.put('/solved/:id',TeacherLogin, markComplaintAsSolved);
router.get('/complaintByStudentId/:id',checkLogin,  getComplaintByStudentId);

export default router;
