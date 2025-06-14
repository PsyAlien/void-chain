import React, { useEffect, useState } from "react";
import { getMyTransactions } from "../services/api";

function MyTransactions() {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    async function fetchMyTxs() {
      const data = await getMyTransactions();
      setTxs(data);
    }

    fetchMyTxs();
  }, []);

  return (
    <div>
      <h2>My Transactions</h2>
      <ul>
        {txs.map((tx) => (
          <li key={tx._id}>
            To: {tx.recipient}, Amount: {tx.amount}, 
            Status: {tx.mined ? "✅ Mined" : "🕒 Pending"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTransactions;
