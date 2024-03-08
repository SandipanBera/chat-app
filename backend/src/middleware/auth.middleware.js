import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const incomingToken =
      req.cookies?.access_token ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!incomingToken) {
      throw new apiError(401, "No token provided");
    }
    const decoded = jwt.verify(incomingToken, process.env.ACCESS_TOKEN_KEY);
    const user =await User.findById(decoded._id).select("-password -refreshtoken");
    if (!user) {
      throw new apiError(404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(404, error?.message || "Invalid request");
  }
});
export default verifyJwt;
