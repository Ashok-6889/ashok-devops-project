import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [gender, setGender] = useState("");
  const [finalText, setFinalText] = useState("");
  const [showResult, setShowResult] = useState(false);

  // ⚠️ keep suffix configurable
  const suffix = "Kojja";

  // ✅ EVERY 3 SECONDS DECREASE (SAFE)
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => {
        if (prev <= 0) return 0;
        return prev - 1000;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleClap = () => {
    setAmount(prev => prev + 1000);
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
            style={{ padding: "8px", fontSize: "16px", marginTop: "15px" }}
          />

          <div style={{ marginTop: "10px" }}>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>

            <label style={{ marginLeft: "15px" }}>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>
          </div>

          <button
            className="surprise-btn"
            style={{ marginTop: "15px" }}
            onClick={handleSubmit}
          >
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
    </div>
  );
}

export default App;
