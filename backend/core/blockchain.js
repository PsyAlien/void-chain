import crypto from "crypto";

function calculateHash(index, previousHash, timestamp, transactions, nonce) {
  return crypto
    .createHash("sha256")
    .update(index + previousHash + timestamp + JSON.stringify(transactions) + nonce)
    .digest("hex");
}

function mineBlock(index, previousHash, transactions, difficulty = 2) {
  let nonce = 0;
  const timestamp = Date.now();
  let hash = calculateHash(index, previousHash, timestamp, transactions, nonce);

  while (!hash.startsWith("0".repeat(difficulty))) {
    nonce++;
    hash = calculateHash(index, previousHash, timestamp, transactions, nonce);
  }

  return {
    index,
    timestamp,
    transactions,
    previousHash,
    hash,
    nonce,
  };
}

export { mineBlock, calculateHash };
