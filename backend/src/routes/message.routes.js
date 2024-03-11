import { Router } from "express";
import verifyJwt from "../middleware/auth.middleware.js";
import { getMessage, messageHandler } from "../controller/message.controller.js";
const router =  Router()
router.route("/send/:id").post(verifyJwt, messageHandler)
router.route("/getMessage/:id").get(verifyJwt,getMessage)
export default router