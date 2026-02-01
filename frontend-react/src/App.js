import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(17000);
  const [showSurprise, setShowSurprise] = useState(false);

  // ⏳ If no clap for 20 sec → amount decrease
  useEffect(() => {
    const timer = setTimeout(() => {
      setAmount((prev) => (prev > 1000 ? prev - 1000 : prev));
    }, 20000);

    return () => clearTimeout(timer);
  }, [amount]);

  const handleClap = () => {
    setAmount((prev) => (prev < 1000000 ? prev + 1000 : prev));
  };

  return (
    <div className="app-container">
      {/* Name */}
      <h1 className="title">Ruby</h1>

      {/* Celebration GIF under name */}
      <img
        src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
        alt="celebration"
        className="celebration"
      />

      {/* Clap */}
      <div className="clap" onClick={handleClap}>
        👏
      </div>

      {/* Cart amount */}
      <p className="amount">Cart Amount: ₹{amount}</p>

      {/* Surprise Button */}
      <button className="surprise-btn" onClick={() => setShowSurprise(true)}>
        Surprise kosam ikkada click cheyandi
      </button>

      {/* Surprise content */}
      {showSurprise && (
        <div className="surprise-box">
          <h2>Your Kojja</h2>
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
