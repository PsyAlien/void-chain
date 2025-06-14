import React, { useState } from "react";
import { createTransaction } from "../services/api";

function NewTransaction() {
  const [form, setForm] = useState({ recipient: "", amount: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createTransaction(form);
    setMessage(result.message || "Transaction sent.");
  };

  return (
    <div>
      <h2>Create New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input name="recipient" onChange={handleChange} placeholder="Recipient" />
        <input name="amount" type="number" onChange={handleChange} placeholder="Amount" />
        <button type="submit">Send</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default NewTransaction;
