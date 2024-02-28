import mongoose, { Schema } from "mongoose";
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
    profileImage: {
      type: profileSchema,
    },
    password: {
      type: String,
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
  this.password=await  bcrypt.hash(this.password, 10);
  next()
});
const User = mongoose.model("User", userSchema); //creating a model of the schema and saving it as User
export default User;
