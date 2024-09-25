import express from 'express';
import { admin, adminforgetpass, resetPassword } from "../controller/admin.login.controller.js";

const router = express.Router();

router.post("/", admin);
router.post("/", adminforgetpass);
router.post("/", resetPassword);


export default router;