import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (user === "Ashok" && pass === "Ashok@6889") {
      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;
