import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Transaction from "../models/Transaction.js";
import Block from "../models/Block.js";
import { mineBlock } from "../core/blockchain.js";
import { getIO } from "../socket.js";

const router = express.Router();

// Mine a new block
router.post("/mine", authMiddleware, async (req, res) => {
  try {
    let pendingTx = await Transaction.find({ mined: false });

    if (pendingTx.length === 0) {
      return res.status(400).json({ message: "No transactions to mine." });
    }

    const lastBlock = await Block.findOne().sort({ index: -1 });
    const index = lastBlock ? lastBlock.index + 1 : 1;
    const previousHash = lastBlock ? lastBlock.hash : "0";

    // Add mining reward
    const rewardTx = new Transaction({
      sender: "network",
      recipient: req.user.userId,
      amount: 50,
    });
    await rewardTx.save();

    pendingTx.push(rewardTx);

    const mined = mineBlock(index, previousHash, pendingTx.map(tx => tx._id));

    const newBlock = new Block(mined);
    await newBlock.save();

    // Mark transactions as mined
    await Transaction.updateMany(
      { _id: { $in: pendingTx.map(tx => tx._id) } },
      { $set: { mined: true } }
    );

    // Broadcast new block to peers
    getIO().emit("broadcast_block", newBlock);

    res.status(201).json({ message: "Block mined", block: newBlock });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Mining failed" });
  }
});

// Get all blocks (with transaction details)
router.get("/", async (req, res) => {
  try {
    const blocks = await Block.find().populate("transactions").sort({ index: 1 });
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blocks" });
  }
});

export default router;
