import { createServer } from "http";
import { Server } from "socket.io";
import app from "../app.js";

const httpServer = createServer(app);
// create new socket io server instance attached to the http server
const io = new Server(httpServer, {
  cors: {
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
let usersInRoom = {}; // keeps track of all users in a room
// when a user connected to the server
io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);
  const userId = socket.handshake["query"]["userId"];
  console.log(userId);
  if (userId) {
    usersInRoom[userId] = socket.id;
  }
  console.log(usersInRoom);
  io.emit("getOnlineUser", Object.keys(usersInRoom)); // send online users info to newly joined user
  // when a user disconnects
  socket.on("disconnect", () => {
    delete usersInRoom[userId]; // remove user from list of users in room
    console.log(`user disconnected ${socket.id}`);
    io.emit("getOnlineUser", Object.keys(usersInRoom));
  });
});

export default httpServer;
