import connectDB from "./db//index.js";
import dotenv from "dotenv";
import path from "path";
import express from "express";
import { httpServer, app } from "./socket/socket.js";
// Load environment variables from .env file if it exists.
dotenv.config(
  // Specify the path to .env file.
  { path: "./.env" }
);
/--------------Deployment-----------------/;
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
  );
}
/--------------Deployment-----------------/;
connectDB()
  /**
   * Starts the server and listens on the specified port.
   * If the `process.env.PORT` variable is not set, the server will listen on port 4000.
   */
  .then(() => {
    httpServer.listen(process.env.PORT || 4000, () =>
      console.log("Server started on port " + process.env.PORT)
    );

    /**
     * Handles the error event emitted by the app.
     * Logs the error message and throws the error.
     * @param {Error} error - The error object emitted by the app.
     * @returns {void}
     */
    httpServer.on("error", (error) => {
      console.log("database not connected", error);
      throw error;
    });
  })

  .catch((error) => console.log(error));
