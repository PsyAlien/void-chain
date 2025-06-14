import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: { type: Date, default: Date.now },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  previousHash: String,
  hash: String,
  nonce: Number
});

const Block = mongoose.model("Block", blockSchema);
export default Block;
