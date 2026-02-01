import React, { useState } from "react";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const login = () => {
    if (user === "Ashok" && pass === "Ashok@6889") {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin";
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-bg">
      <div className="glass admin-table">
        <h2>Admin Login</h2>

        <input placeholder="Username" onChange={e => setUser(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPass(e.target.value)}
        />

        <button onClick={login}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
