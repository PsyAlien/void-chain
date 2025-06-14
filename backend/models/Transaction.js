import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  amount: Number,
  timestamp: { type: Date, default: Date.now },
  mined: { type: Boolean, default: false }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
