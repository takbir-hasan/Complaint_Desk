import express from 'express';
import {info} from "../controller/info.controller.js";

const router = express.Router();

router.get("/",info)

export default router;
