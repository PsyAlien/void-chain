// backend/socket.js

import { Server } from "socket.io";

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

export { initSocket, getIO };
