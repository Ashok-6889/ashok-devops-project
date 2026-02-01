import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(4000);
  const [nameInput, setNameInput] = useState("");
  const [gender, setGender] = useState("");
  const [finalText, setFinalText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const timerRef = useRef(null);

  // 🔁 CHANGE THIS ONE WORD LOCALLY IF YOU WANT
  const suffix = "Kojja";

  // ⏳ 20 sec idle → decrease amount
  const startIdleTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAmount((prev) => (prev > 1000 ? prev - 1000 : prev));
    }, 3000);
  };

  useEffect(() => {
    startIdleTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClap = () => {
    setAmount((prev) => (prev < 100000 ? prev + 1000 : prev));
    startIdleTimer();
  };

  const handleSubmit = () => {
    if (nameInput.trim() !== "") {
      setFinalText(`${nameInput} ${suffix}`);
      setShowResult(true);
    }
  };

  return (
    <div className="app-container">
      {/* ✅ Title */}
      <h1 className="title">Gender Verification</h1>

      {/* Clap */}
      <div className="clap" onClick={handleClap}>
        👏
      </div>

      {/* Amount */}
      <p className="amount">Cart Amount: ₹{amount}</p>

      {!showResult && (
        <>
          {/* Name input */}
          <input
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            style={{ padding: "8px", fontSize: "16px", marginTop: "15px" }}
          />

          {/* Gender select */}
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

          {/* Submit */}
          <button
            className="surprise-btn"
            style={{ marginTop: "15px" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      )}

      {/* Result */}
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
