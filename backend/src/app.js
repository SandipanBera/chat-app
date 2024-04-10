import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
const app = express();
// Enable CORS with specified origin and credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse JSON requests with a limit of 10kb
app.use(express.json({ limit: "10kb" }));

// Parse URL-encoded requests with extended mode and a limit of 10kb
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies
app.use(cookieParser());
// Import user routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
import messageRouter from "./routes/message.routes.js";
app.use("/api/v1/users", messageRouter)
export default app
