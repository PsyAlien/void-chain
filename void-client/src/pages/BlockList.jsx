import React, { useEffect, useState } from "react";
import { getAllBlocks } from "../services/api";

function BlockList() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchBlocks() {
      const data = await getAllBlocks();
      setBlocks(data);
    }

    fetchBlocks();
  }, []);

  return (
    <div>
      <h2>Blockchain</h2>
      {blocks.map((block) => (
        <div key={block._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h4>Block #{block.index}</h4>
          <p><strong>Hash:</strong> {block.hash}</p>
          <p><strong>Previous Hash:</strong> {block.previousHash}</p>
          <p><strong>Nonce:</strong> {block.nonce}</p>
          <p><strong>Transactions:</strong></p>
          <ul>
            {block.transactions.map((tx) => (
              <li key={tx._id}>
                From: {tx.sender} → To: {tx.recipient}, Amount: {tx.amount}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default BlockList;
