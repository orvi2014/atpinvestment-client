import React, { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://atpinvestment.onrender.com/api/auth/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(
        `https://atpinvestment.onrender.com/api/api/v1/accounts/${_id}`,
        { method: "DELETE" }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
  
      setUsers(users.filter((user) => user._id !== _id));
    } catch (error) {
      alert(error.message);
    }
  };
  

  if (loading) return <p className="text-center">Loading users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300">
        {/* Table Header */}
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border px-4 py-2">Unique ID</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="border px-4 py-2">{user.uniqueId}</td>
              <td className="border px-4 py-2">{user.fullname}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 text-center">
              <button
                  onClick={() => handleDelete(user._id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "0",
                    textDecoration: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
