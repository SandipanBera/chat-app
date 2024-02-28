import mongoose from "mongoose";
import {db_name} from "../constant.js";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${db_name}`
    );

    console.log("MongoDB Connected...", connectionInstance.connection.host);
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1);
  }
};
export default connectDB;
