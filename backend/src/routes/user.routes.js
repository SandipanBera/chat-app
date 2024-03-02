import { Router } from "express";
import { serverCheck } from "../controller/server.controller.js";
import upload from "../middleware/mullter.middleware.js";
import { loginUser, registerUser } from "../controller/user.controller.js";
const router = Router();
router.route('/check').get(serverCheck)
router.route("/signup").post(upload.single("profileImage"), registerUser)
router.route("/signin").post(loginUser)
export default router;