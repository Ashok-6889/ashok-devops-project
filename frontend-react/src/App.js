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
  const [maxClaps, setMaxClaps] = useState(0);

  // 🔐 Admin states
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const suffix = " Welcome to my project 🚀 ";

  // ⏱ every 3 sec decrease
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount((prev) => (prev <= 0 ? 0 : prev - 1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 👏 clap logic
  const handleClap = () => {
    setAmount((prev) => prev + 1000);
    setClapCount((prev) => {
      const updated = prev + 1;
      setMaxClaps((m) => (updated > m ? updated : m));
      return updated;
    });
  };

  // ✅ Submit + save user data
  const handleSubmit = () => {
    if (!nameInput.trim()) return;

    setFinalText(`${nameInput}${suffix}`);
    setShowResult(true);

    const existing = JSON.parse(localStorage.getItem("userData")) || [];

    const newEntry = {
      name: nameInput,
      gender: gender || "N/A",
      claps: clapCount,
      maxClaps: maxClaps,
    };

    localStorage.setItem("userData", JSON.stringify([...existing, newEntry]));
  };

  const adminData = JSON.parse(localStorage.getItem("userData")) || [];

  return (
    <div className="app-container">
      {/* ================= USER UI ================= */}
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
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setGender("male")}
                />{" "}
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setGender("female")}
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
              className="surprise-gif"
              src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
              alt="celebration"
            />
          </div>
        )}
      </div>

      {/* ================= ADMIN LOGIN BUTTON ================= */}
      {!isAdmin && (
        <button
          className="admin-toggle"
          onClick={() => setShowAdminLogin(!showAdminLogin)}
        >
          Login as Admin
        </button>
      )}

      {showAdminLogin && !isAdmin && (
        <AdminLogin
          onSuccess={() => {
            setIsAdmin(true);
            setShowAdminLogin(false);
          }}
        />
      )}

      {/* ================= ADMIN TABLE (ONLY AFTER LOGIN) ================= */}
      {isAdmin && (
        <div className="admin-table-panel">
          <h3>User Clap Data</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Claps</th>
                <th>Max Claps</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.gender}</td>
                  <td>{u.claps}</td>
                  <td>{u.maxClaps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
