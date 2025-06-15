# ⚡️ Void – Chain Cryptocurrency Project

Void is a full-stack chain project built from scratch. It simulates a simple cryptocurrency system with transaction handling, block mining, multi-node networking via WebSockets, and secure user authentication.

---

## ✨ Features

- ⛓️ Custom chain with mining and block validation
- 💸 Transaction pool and reward system
- 🔒 JWT-secured login & registration
- 📡 Real-time multi-node sync using WebSockets (Socket.io)
- 🧠 MongoDB for storing users, transactions, and blocks
- ⚛️ React + Vite frontend with protected routes

---

## 🧰 Tech Stack

| Frontend          | Backend             | Database | Networking  |
|------------------|---------------------|----------|-------------|
| React + Vite     | Node.js + Express   | MongoDB  | WebSocket (Socket.io) |
| Basic CSS        | JWT Auth            | Mongoose |             |

---

## 📂 Folder Structure

Void/
├── backend/ # Express backend + chain logic
├── void-client/ # React + Vite frontend



## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/void.git
cd void

2. Setup the Backend

cd backend
npm install


🔐 Create a .env file in the backend/ folder:

env

PORT=5000
MONGO_URI=mongodb://localhost:27017/void
JWT_SECRET=your_jwt_secret


✅ Start the server:

npm run dev


3. Setup the Frontend

cd ../void-client
npm install
npm run dev

Visit: http://localhost:5173

🔄 Running Multiple Nodes (Simulate Network)
To simulate multiple Void nodes syncing via WebSockets:


# Terminal 1
PORT=5000 node backend/server.js

# Terminal 2 (different port)
PORT=5001 node backend/server.js

Now you have two nodes that broadcast and sync transactions and blocks.
