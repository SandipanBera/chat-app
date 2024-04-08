import { createServer } from "http";
import { Server } from "socket.io";
import app from "../app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN, methods: ["GET", "POST"] },
  
});
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

export default httpServer

