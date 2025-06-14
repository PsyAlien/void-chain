// 1. IMPORTS at the top
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http"; // ✅ for WebSocket server
import { initSocket, getIO } from "./socket.js"; // ✅ Socket server
import { connectToPeer } from "./peerClient.js"; // ✅ Socket client

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";

dotenv.config();

// 2. SETUP app + server
const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// 3. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 4. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/blocks", blockRoutes);

// 5. TEST ROUTE
app.get("/", (req, res) => {
  res.send("👋 Void backend is running (with WebSocket)!");
});

// 6. SOCKET.IO EVENTS
io.on("connection", (socket) => {
  console.log("🟢 New node connected");

  socket.on("broadcast_transaction", (txData) => {
    console.log("📩 Transaction received from peer:", txData);
  });

  socket.on("broadcast_block", (blockData) => {
    console.log("📦 Block received from peer:", blockData);
  });
});

// 7. MONGODB + START SERVER
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);

      // 8. Connect to peer node if this is a secondary port (5001)
      if (PORT === "5001" || PORT === 5001) {
        connectToPeer("http://localhost:5000"); // connect to main node
      }
    });
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
