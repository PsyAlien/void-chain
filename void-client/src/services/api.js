const API_URL = "http://localhost:5000";

// 🔐 Login
export async function loginUser(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); // { token: "...", message: "Logged in" }
}

// 🆕 Register
export async function registerUser(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Registration failed");
  }

  return res.json(); // { message: "User created" }
}

// 🕓 Fetch pending transactions (for mining)
export async function fetchPendingTransactions() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/transactions/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Unauthorized");
  }

  return res.json(); // array of pending transactions
}

// ⛏️ Mine a block
export async function mineBlock() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/blocks/mine`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Mining failed");
  }

  return res.json(); // { message: ..., block: {...} }
}


// 💸 Create a new transaction
export async function createTransaction(recipient, amount) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipient, amount }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Transaction failed");
  }

  return res.json(); // { message: "Transaction created", tx: {...} }
}


// 📦 Get all blocks from the blockchain
export async function getAllBlocks() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/blocks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch blocks");
  }

  return res.json(); // should return array of blocks
}


// 📄 Get transactions created by the logged-in user
export async function getMyTransactions() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/transactions/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch your transactions");
  }

  return res.json(); // returns array of transactions
}
