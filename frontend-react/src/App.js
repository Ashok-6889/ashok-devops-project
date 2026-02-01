import React, { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogin = () => {
    if (username === "Ashok" && password === "Ashok@6889") {
      setLoggedIn(true);
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      {!userData ? (
        <p>No user data available</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Claps</th>
              <th>Max Claps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.name}</td>
              <td>{userData.gender}</td>
              <td>{userData.claps}</td>
              <td>{userData.maxClaps}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
