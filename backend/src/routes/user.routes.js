import { Router } from "express";
import { serverCheck } from "../controller/user.controller.js";
const router = Router();
router.route('/check').get(serverCheck)
export default router;