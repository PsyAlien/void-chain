import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTransaction from "./pages/NewTransaction";
import MineBlock from "./pages/MineBlock";
import BlockList from "./pages/BlockList";
import MyTransactions from "./pages/MyTransactions";
import Home from "./pages/Home";

function AppWrapper() {
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  useEffect(() => {
    const handleStorage = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/new-transaction" style={{ marginRight: "10px" }}>New Tx</Link>
            <Link to="/mine" style={{ marginRight: "10px" }}>Mine</Link>
            <Link to="/blocks" style={{ marginRight: "10px" }}>Blocks</Link>
            <Link to="/my-transactions" style={{ marginRight: "10px" }}>My Tx</Link>
            {username && (
              <span style={{ marginRight: "10px" }}>👤 {username}</span>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          </>
        )}

        <button onClick={() => setDark(!dark)} style={{ float: "right" }}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-transaction" element={<NewTransaction />} />
        <Route path="/mine" element={<MineBlock />} />
        <Route path="/blocks" element={<BlockList />} />
        <Route path="/my-transactions" element={<MyTransactions />} />
      </Routes>
    </div>
  );
}

// Wrap with BrowserRouter to allow useNavigate inside AppWrapper
function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
