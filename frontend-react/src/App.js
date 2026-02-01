import React, { useEffect, useState } from "react";
import "./App.css";
import AdminLogin from "./AdminLogin";

function App() {
  const [amount, setAmount] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [gender, setGender] = useState("");
  const [finalText, setFinalText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [clapCount, setClapCount] = useState(0);

  // 🔐 admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const suffix = " nv edhava le gani paduko ink ph em chustav ";

  // ⏱ every 3 sec decrease
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => (prev <= 0 ? 0 : prev - 1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClap = () => {
    setAmount((prev) => prev + 1000);
    setClapCount((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (nameInput.trim() !== "") {
      setFinalText(`${nameInput}${suffix}`);
      setShowResult(true);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">Gender Verification</h1>

        <div className="clap" onClick={handleClap}>👏</div>

        <p className="amount">Cart Amount: ₹{amount}</p>

        {!showResult && (
          <>
            <input
              className="name-input"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />

            <div className="gender-box">
              <label>
                <input type="radio" name="gender" onChange={() => setGender("male")} /> Male
              </label>
              <label>
                <input type="radio" name="gender" onChange={() => setGender("female")} /> Female
              </label>
            </div>

            <button className="surprise-btn" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}

        {showResult && (
          <div className="surprise-box">
            <h2>{finalText}</h2>
            <img
              className="surprise-gif"
              src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
              alt="celebration"
            />
          </div>
        )}
      </div>

      {/* 🔐 ADMIN BUTTON */}
      {!isAdmin && (
        <button className="admin-toggle" onClick={() => setShowAdminLogin(!showAdminLogin)}>
          Login as Admin
        </button>
      )}

      {showAdminLogin && !isAdmin && (
        <AdminLogin onSuccess={() => {
          setIsAdmin(true);
          setShowAdminLogin(false);
        }} />
      )}

      {/* 👀 ADMIN PANEL (ONLY FOR YOU) */}
      {isAdmin && (
        <div className="admin-panel">
          <h4>Live User Data</h4>
          <p><b>Name:</b> {nameInput || "-"}</p>
          <p><b>Gender:</b> {gender || "-"}</p>
          <p><b>Claps:</b> {clapCount}</p>
        </div>
      )}
    </div>
  );
}

export default App;
