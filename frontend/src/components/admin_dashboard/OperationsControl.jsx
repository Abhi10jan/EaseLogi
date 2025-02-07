import React, { useState } from "react";

const OperationsControl = () => {
  // State to manage users
  const [users, setUsers] = useState([
    { id: 1, userId: "USR001", name: "Amit Sharma", role: "MSME", status: "Active" },
    { id: 2, userId: "USR002", name: "Rajesh Kumar", role: "Logistics Provider", status: "Inactive" },
  ]);
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Operations Control</h2>

      {/* User Management Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-lg font-bold mb-4 text-gray-700">User Management</h3>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border rounded w-full mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        {/* User List Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{user.userId}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.role}</td>
                  <td className={`p-3 font-bold ${user.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {user.status}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-600">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Logistics Monitoring Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-700">Logistics Monitoring</h3>
        <p className="text-gray-600">Live tracking & shipment status coming soon...</p>
      </div>
    </div>
  );
};

export default OperationsControl;
