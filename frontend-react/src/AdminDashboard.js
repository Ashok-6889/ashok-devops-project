import React from "react";

function AdminDashboard() {
  const data = JSON.parse(localStorage.getItem("userData")) || [];

  return (
    <div className="admin-table">
      <h2>User Clap Data</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Claps</th>
            <th>Max Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u, i) => (
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
  );
}

export default AdminDashboard;
