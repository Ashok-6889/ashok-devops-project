import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const navigate = useNavigate();

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

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
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.gender}</td>
              <td>{u.claps}</td>
              <td>{u.maxClaps}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/")}>Logout</button>
    </div>
  );
}

export default AdminPage;
