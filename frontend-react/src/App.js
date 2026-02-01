import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(4000);
  const [showSurprise, setShowSurprise] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [finalName, setFinalName] = useState("");
  const timerRef = useRef(null);

  // 👉 CHANGE THIS SUFFIX LOCALLY IF YOU WANT
  const suffix = "Surprise";

  // 20 sec idle → decrease amount
  const startIdleTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAmount((prev) => (prev > 1000 ? prev - 1000 : prev));
    }, 20000);
  };

  useEffect(() => {
    startIdleTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClap = () => {
    setAmount((prev) => (prev < 100000 ? prev + 1000 : prev));
    startIdleTimer();
  };

  const handleSubmitName = () => {
    if (nameInput.trim() !== "") {
      setFinalName(`${nameInput} ${suffix}`);
      setShowSurprise(true);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Ruby</h1>

      <img
        src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
        alt="celebration"
        className="celebration"
      />

      <div className="clap" onClick={handleClap}>
        👏
      </div>

      <p className="amount">Cart Amount: ₹{amount}</p>

      {!showSurprise && (
        <>
          <button className="surprise-btn">
            Surprise kosam ikkada click cheyandi
          </button>

          <div style={{ marginTop: "15px" }}>
            <input
              type="text"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              style={{ padding: "8px", fontSize: "16px" }}
            />
            <br />
            <button
              className="surprise-btn"
              style={{ marginTop: "10px" }}
              onClick={handleSubmitName}
            >
              Submit
            </button>
          </div>
        </>
      )}

      {showSurprise && (
        <div className="surprise-box">
          <h2>{finalName}</h2>
          <img
            src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
            alt="party"
            className="surprise-gif"
          />
        </div>
      )}
    </div>
  );
}

export default App;
