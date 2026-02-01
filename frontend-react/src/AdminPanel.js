import React, { useEffect, useState } from "react";
import "./admin.css";

function AdminPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin-login";
    }

    const i = setInterval(() => {
      const d = JSON.parse(localStorage.getItem("userData"));
      if (d) setData(d);
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="admin-bg">
      <div className="admin-table glass">
        <h2>User Data Table</h2>

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
            {data ? (
              <tr>
                <td>{data.name}</td>
                <td>{data.gender}</td>
                <td>{data.claps}</td>
                <td>{data.maxClaps}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
