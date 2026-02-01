import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [gender, setGender] = useState("");
  const [finalText, setFinalText] = useState("");
  const [showResult, setShowResult] = useState(false);

  // 🔥 NEW: clap counter (admin view kosam)
  const [clapCount, setClapCount] = useState(0);

  // ⚠️ suffix configurable
  const suffix = " nv edhava le gani paduko ink ph em chustav ";

  // ✅ EVERY 3 SECONDS DECREASE
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => (prev <= 0 ? 0 : prev - 1000));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClap = () => {
    setAmount(prev => prev + 1000);
    setClapCount(prev => prev + 1); // 👈 track claps
  };

  const handleSubmit = () => {
    if (nameInput.trim() !== "") {
      setFinalText(`${nameInput} ${suffix}`);
      setShowResult(true);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Gender Verification</h1>

      <div className="clap" onClick={handleClap}>
        👏
      </div>

      <p className="amount">Cart Amount: ₹{amount}</p>

      {!showResult && (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="name-input"
          />

          <div className="gender-box">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
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
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="celebration"
            className="surprise-gif"
          />
        </div>
      )}

      {/* 🔴 BACKGROUND / ADMIN VIEW */}
      <div className="admin-panel">
        <h4>Live User Data</h4>
        <p><b>Name:</b> {nameInput || "Not entered"}</p>
        <p><b>Gender:</b> {gender || "Not selected"}</p>
        <p><b>Claps:</b> {clapCount}</p>
      </div>
    </div>
  );
}

export default App;
