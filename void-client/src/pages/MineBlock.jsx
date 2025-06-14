import React, { useEffect, useState } from "react";
import { fetchPendingTransactions, mineBlock } from "../services/api.js";


function MineBlock() {
  const [pending, setPending] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPendingTransactions()
      .then((data) => setPending(data))
      .catch((err) => {
        console.error("❌ Error loading pending transactions:", err.message);
        setError(err.message);
      });
  }, []);

  const handleMine = async () => {
    setMessage("");
    setError("");

    try {
      const res = await mineBlock();
      setMessage(`✅ Block mined! Index: ${res.block.index}`);
      // Refresh pending transactions
      const updated = await fetchPendingTransactions();
      setPending(updated);
    } catch (err) {
      console.error("❌ Mining error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>🪙 Pending Transactions</h2>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {Array.isArray(pending) && pending.length > 0 ? (
        pending.map((tx) => (
          <div key={tx._id} style={{ border: "1px solid #ccc", margin: "5px", padding: "5px" }}>
            From: {tx.sender} → To: {tx.recipient} | 💰 {tx.amount}
          </div>
        ))
      ) : (
        <p>No pending transactions to mine.</p>
      )}

      <button onClick={handleMine}>⛏️ Mine Block</button>
    </div>
  );
}

export default MineBlock;
