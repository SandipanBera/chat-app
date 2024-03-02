import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const profileSchema = new Schema({
  url: String,
  public_id: String,
});
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
      trim: true,
      maxLength: 32,
      require: [true, "Please provide your name"],
    },
    userName: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      maxLength: 32,
      require: [true, "Please provide your username"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      require: [true, "Please provide your email"],
    },
    gender: {
      type: String,
      require: true,
      enum: ["male", "female"],
    },
    profileImage: {
      type: profileSchema,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
    },
    refreshtoken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Method to compare and validate the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.genetrateAccesstoken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};
userSchema.methods.genetrateRefreshtoken = function(){
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};
const User = mongoose.model("User", userSchema); //creating a model of the schema and saving it as User
export default User;
