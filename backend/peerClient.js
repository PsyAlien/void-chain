// backend/peerClient.js
import { io as clientIo } from "socket.io-client";

export function connectToPeer(peerUrl) {
  const socket = clientIo(peerUrl);

  socket.on("connect", () => {
    console.log(`🔗 Connected to peer: ${peerUrl}`);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Disconnected from peer: ${peerUrl}`);
  });

  socket.on("broadcast_transaction", (tx) => {
    console.log("📨 Transaction broadcast received from peer:", tx);
  });

  socket.on("broadcast_block", (block) => {
    console.log("📦 Block broadcast received from peer:", block);
  });
}
