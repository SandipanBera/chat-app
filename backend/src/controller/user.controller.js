import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinaryUpload from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccesstokenAndRefreshtoken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.genetrateAccesstoken();
  const refreshToken = await user.genetrateRefreshtoken();
  user.refreshtoken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
const option = {
  httpOnly: true,
  secure: true,
};
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password, confirmPassword, gender } =
    req.body;
  // Check required fields
  if (
    [fullName, userName, email, password, confirmPassword, gender].some(
      (field) => field?.trim() === ""
    )
  )
    throw new apiError(400, "all fields required");
  // checking password
  if (password !== confirmPassword) {
    throw new apiError(400, "Passwords do not match");
  }
  // check if the username and email is already taken or not
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new apiError(409, "username or email already registered");
  }
  const profilePicLocalPath = req.file?.path;
  let profileImage = "";
  if (profilePicLocalPath) {
    profileImage = await cloudinaryUpload(profilePicLocalPath);
    if (!profileImage?.url) {
      throw new apiError(500, "failed to upload image");
    }
  }
  const boyPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
  const girlPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
  const user = await User.create({
    fullName,
    userName,
    email,
    gender,
    profileImage: {
      url: profileImage.url || gender === "male" ? boyPic : girlPic,
      public_id: profileImage.public_id || "",
    },
    password,
  });
  const createdUser = await User.findById(user._id)?.select(
    "-password -refreshtoken"
  );
  if (!createdUser) {
    throw new apiError(500, "something went wrong while register");
  }
  return res
    .status(201)
    .json(new apiResponse("User created successfully", 200, createdUser));
});
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // check inputs validation
  if (!username?.trim() || !password?.trim()) {
    throw new apiError(400, "username and password are required fields");
  }
  if (password.length < 6) {
    throw new apiError(400, "password's length must be at least 6");
  }
  // find the user in database by the username
  const user = await User.findOne({ userName: username });
  if (!user) {
    throw new apiError(404, "User does not exist");
  }

  // compare the provided password with the hash
  const verifyPassword = await user.comparePassword(password);
  if (!verifyPassword) {
    throw new apiError(401, "Invalid Password");
  }

  // generate a token for this user and save it into db and send into client cookies
  const { accessToken, refreshToken } =
    await generateAccesstokenAndRefreshtoken(user?._id);
  const logedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );
  return res
    .status(200)
    .cookie("access_token", accessToken, option)
    .cookie("refresh_token", refreshToken, option)
    .json(new apiResponse("User succefully logged in", 200, logedInUser));
});
// @desc Logout / clear cookie
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshtoken: "" } },
    { new: true }
  ).select("-password -refreshtoken");
  return res
    .status(200)
    .clearCookie("access_token", option)
    .clearCookie("refresh_token", option)
    .json(new apiResponse("User successfully logged out", 200, {}));
});
const currentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new apiResponse("Successfully fetched user", 200, req.user));
});
const refreshToken = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // Check if user exists
  if (!user) {
    throw new apiError(400, "No user found with given credentials");
  }
  // check if the refresh token is valid
  const isValidRefreshToken = jwt.verify(
    req.cookies.refresh_token,
    process.env.REFRESH_TOKEN_KEY
  );
  if (!isValidRefreshToken) {
    throw new apiError(401, "not a valid token");
  }
  // check save token from database matches incoming token
  if (req.cookies.refresh_token !== user.refreshtoken) {
    throw new apiError(401, "Authentication error");
  }
  // Generate new tokens and save in database
  const { accessToken, refreshToken } =
    await generateAccesstokenAndRefreshtoken(user._id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { refreshtoken: refreshToken } },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .cookie("access_token", accessToken, option)
    .cookie("refresh_token", refreshToken, option)
    .json(new apiResponse("Successfully refresh token", 200, updatedUser));
});
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  // Check for password length
  if (
    oldPassword.length < 6 ||
    confirmPassword.length < 6 ||
    newPassword.length < 6
  ) {
    throw new apiError(400, "Password should be at least 6 characters long");
  }
  // Checking if both (old and confirm) passwords are same or not
  if (newPassword !== confirmPassword) {
    throw new apiError(400, "Both Password must be same!");
  }
  const user = await User.findById(req.user._id);
  // compare old password to hashed password stored in db
  const verifyPassword = await user.comparePassword(oldPassword);
  if (!verifyPassword) {
    throw new apiError(401, "Invalid Old Password");
  }
  user.password = newPassword;
  await user.save();
  const updatedUser = await User.findById(req.user._id).select(
    "-password -refreshtoken"
  );
  res
    .status(200)
    .json(
      new apiResponse(
        "Password has been changed successfully!",
        200,
        updatedUser
      )
    );
});
const updateUserDetails = asyncHandler(async (req, res) => {
  const { Fullname, Username, Email, Gender } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName: Fullname || req.user.fullName,
        userName: Username || req.user.userName,
        email: Email || req.user.email,
        gender: Gender || req.user.gender,
      },
    },
    { new: true }
  ).select("-password  -refreshtoken");
  if (!user) {
    throw new apiError(500, "Server Error");
  }
  return res
    .status(200)
    .json(new apiResponse("Profile Updated Successfully.", 200, user));
});
const changeAvatar = asyncHandler(async (req, res) => {
  const localImagePath = req.file?.path;
  const user = await User.findById(req.user._id).select(
    "-password -refreshtoken"
  );
  if (localImagePath) {
    const imageUrl = await cloudinaryUpload(localImagePath);
    user.profileImage.url = imageUrl.url;
    user.profileImage.public_id = imageUrl.public_id;
    await user.save({ validateBeforeSave: false });
    const updatedUser = await User.findById(req.user._id).select(
      "-password -refreshtoken"
    );
    return res
      .status(200)
      .json(
        new apiResponse("Successfully updated user profile", 200, updatedUser)
      );
  }
  return res
    .status(200)
    .json(new apiResponse("Successfully updated user profile", 200, user));
});
const getUsers = asyncHandler(async (req, res) => {
  const loggedInUser = req.user._id;
  const users = await User.find({ _id: { $ne: loggedInUser } }).select('-password');
  return res.status(200).json(new apiResponse('Users successfully fetched', 200, users))
})

export {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  refreshToken,
  changePassword,
  updateUserDetails,
  changeAvatar,
  getUsers,
};
