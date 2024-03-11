import { Router } from "express";
import { serverCheck } from "../controller/server.controller.js";
import upload from "../middleware/mullter.middleware.js";
import { changeAvatar, changePassword, currentUser, getUsers, loginUser, logoutUser, refreshToken, registerUser, updateUserDetails } from "../controller/user.controller.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = Router();
router.route('/check').get(serverCheck)
router.route("/signup").post(upload.single("profileImage"), registerUser)
router.route("/signin").post(loginUser)
router.route("/signout").post(verifyJwt, logoutUser)
router.route("/currentUser").get(verifyJwt, currentUser)
router.route("/refreshToken").patch(verifyJwt, refreshToken)
router.route("/changePassword").patch(verifyJwt, changePassword)
router.route("/updateProfile").patch(verifyJwt, updateUserDetails);
router.route("/avatar").patch(verifyJwt, upload.single("profileImage"), changeAvatar)
router.route('/').get(verifyJwt,getUsers)
export default router;