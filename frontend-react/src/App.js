import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [claps, setClaps] = useState(0);
  const navigate = useNavigate();

  const suffix = " Welcome to my project ";

  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(a => (a <= 0 ? 0 : a - 1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClap = () => {
    setAmount(a => a + 1000);
    setClaps(c => c + 1);
  };

  const handleSubmit = () => {
    if (!name) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // max 50 users only
    if (users.length < 50) {
      users.push({
        name,
        gender,
        claps,
        maxClaps: claps
      });
    }

    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1>Gender Verification</h1>

        <div className="clap" onClick={handleClap}>👏</div>

        <p>Cart Amount: ₹{amount}</p>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div>
          <label>
            <input type="radio" name="g" onChange={() => setGender("male")} />
            Male
          </label>
          <label>
            <input type="radio" name="g" onChange={() => setGender("female")} />
            Female
          </label>
        </div>

        <button onClick={handleSubmit}>Submit</button>

        <p><b>{name}{suffix}</b></p>
      </div>

      {/* ADMIN BUTTON */}
      <button
        className="admin-toggle"
        onClick={() => navigate("/admin")}
      >
        Login as Admin
      </button>
    </div>
  );
}

export default App;
