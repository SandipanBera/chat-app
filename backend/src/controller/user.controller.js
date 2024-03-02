import User from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cloudinaryUpload from "../utils/cloudinary.js";

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
  console.log("successfull 2");
  if (existedUser) {
    throw new apiError(409, "username or email already registered");
  }
  console.log("successfull 1");
  const profilePicLocalPath = req.file?.path;
  const profileImage = "";
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

export { registerUser, loginUser };
