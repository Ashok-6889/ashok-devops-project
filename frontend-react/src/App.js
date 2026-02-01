import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./AdminLogin";

function MainApp() {
  const [amount, setAmount] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [gender, setGender] = useState("");
  const [finalText, setFinalText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [clapCount, setClapCount] = useState(0);

  const suffix = " nv edhava le gani paduko ink ph em chustav ";

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
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}
