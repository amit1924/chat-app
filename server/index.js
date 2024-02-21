import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// Configurations
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());

// socket.io
io.on("connection", (socket) => {
  console.log("New Client connected");

  socket.on("message", (message) => {
    console.log(`message received: ${message}`);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("New Client disconnected");
  });
});

// Run The Server

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
