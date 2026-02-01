import React, { useState } from "react";

function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "Ashok" && password === "Ashok@6889") {
      onSuccess();
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="admin-login">
      <h3>Admin Login</h3>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login as Admin</button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AdminLogin;
