import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Transaction from "../models/Transaction.js";
import { getIO } from "../socket.js";

const router = express.Router();

// 🔁 Create a new transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { recipient, amount } = req.body;

    console.log("🔍 Creating transaction:", {
      sender: req.user.userId,
      recipient,
      amount,
    });

    const tx = new Transaction({
      sender: req.user.userId,
      recipient,
      amount,
    });

    await tx.save(); // may throw, so it's inside try/catch

    // 📡 Broadcast to other nodes
    getIO().emit("broadcast_transaction", {
      _id: tx._id,
      sender: tx.sender,
      recipient: tx.recipient,
      amount: tx.amount,
    });


    res.status(201).json({ message: "Transaction created", tx });
  } catch (err) {
    console.error("❌ Error saving transaction:", err.message);
    res.status(500).json({ message: "Error creating transaction" });
  }
});

// 🕓 Get all pending (unmined) transactions
router.get("/pending", authMiddleware, async (req, res) => {
  try {
    const txs = await Transaction.find({ mined: false });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending transactions" });
  }
});

// 👤 Get all transactions by the logged-in user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const myTx = await Transaction.find({ sender: req.user.userId });
    res.json(myTx);
  } catch (err) {
    res.status(500).json({ message: "Error fetching your transactions" });
  }
});

export default router;
