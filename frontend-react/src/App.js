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

  // 🔐 Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const suffix = " nv edhava le gani paduko ink ph em chustav ";

  // ⏱ Every 3 seconds amount decrease
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(prev => (prev <= 0 ? 0 : prev - 1000));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 👏 Clap handler
  const handleClap = () => {
    setAmount(prev => prev + 1000);

    setClapCount(prev => {
      const newCount = prev + 1;

      const existing = JSON.parse(localStorage.getItem("userData") || "{}");

      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: existing.name || nameInput,
          gender: existing.gender || gender,
          claps: newCount,
          maxClaps: Math.max(existing.maxClaps || 0, newCount)
        })
      );

      return newCount;
    });
  };

  // ✅ Submit user data
  const handleSubmit = () => {
    if (nameInput.trim() === "") return;

    const userData = {
      name: nameInput,
      gender: gender,
      claps: clapCount,
      maxClaps: clapCount
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    setFinalText(`${nameInput}${suffix}`);
    setShowResult(true);
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
              onChange={e => setNameInput(e.target.value)}
            />

            <div className="gender-box">
              <label>
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setGender("male")}
                /> Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  onChange={() => setGender("female")}
                /> Female
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

      {/* 🔐 Admin toggle button */}
      {!isAdmin && (
        <button
          className="admin-toggle"
          onClick={() => setShowAdminLogin(!showAdminLogin)}
        >
          Login as Admin
        </button>
      )}

      {/* 🔐 Admin login */}
      {showAdminLogin && !isAdmin && (
        <AdminLogin onSuccess={() => {
          setIsAdmin(true);
          setShowAdminLogin(false);
        }} />
      )}

      {/* 👀 Admin Data Table */}
      {isAdmin && (
        <div className="admin-panel">
          <h3>Admin Dashboard</h3>

          {localStorage.getItem("userData") ? (
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
                {(() => {
                  const d = JSON.parse(localStorage.getItem("userData"));
                  return (
                    <tr>
                      <td>{d.name}</td>
                      <td>{d.gender}</td>
                      <td>{d.claps}</td>
                      <td>{d.maxClaps}</td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
