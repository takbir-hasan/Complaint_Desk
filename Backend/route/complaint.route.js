import express from 'express';

import { complaint, getComplaintsByDept,discardComplaint, getDiscardedComplaintsByDept} from "../controller/complaint.controller.js"; 

const router = express.Router();

router.post("/",complaint)
router.get('/:cdept', getComplaintsByDept);
router.get('/discarded/:cdept', getDiscardedComplaintsByDept);
router.put('/:id', discardComplaint);

export default router;
