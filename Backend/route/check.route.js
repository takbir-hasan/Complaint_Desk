import express from 'express';
import {check} from "../controller/check.controller.js";

const router = express.Router();

router.get("/",check)

export default router;
