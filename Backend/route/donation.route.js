import express from 'express';

import {donor} from "../controller/donation.controller.js"; 

const router = express.Router();

router.post("/",donor);




export default router;