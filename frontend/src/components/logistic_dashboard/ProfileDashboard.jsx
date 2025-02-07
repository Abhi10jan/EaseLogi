import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaEdit, FaSignOutAlt } from "react-icons/fa";

const ProfileDashboard = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    company: "EaseLogi Pvt Ltd",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert("Logging out..."); // Replace with actual logout logic
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#F6F4F0] shadow-xl rounded-lg text-center border border-[#4DA1A9]">
      <h2 className="text-3xl font-bold mb-6 text-[#2E5077]">👤 Profile</h2>

      <div className="space-y-4 text-left text-[#2E5077]">
        <div className="flex items-center space-x-3 text-lg">
          <FaUser className="text-[#4DA1A9]" />
          <span>{user.name}</span>
        </div>
        <div className="flex items-center space-x-3 text-lg">
          <FaEnvelope className="text-[#4DA1A9]" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-lg">
          <FaPhone className="text-[#4DA1A9]" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-lg">
          <FaBuilding className="text-[#4DA1A9]" />
          <span>{user.company}</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <button onClick={handleEdit} className="bg-[#2E5077] text-white px-4 py-2 rounded-lg hover:bg-[#4DA1A9] transition duration-300 flex items-center">
          <FaEdit className="mr-2" /> Edit Profile
        </button>

        <button onClick={handleLogout} className="bg-[#4DA1A9] text-white px-4 py-2 rounded-lg hover:bg-[#79D7BE] transition duration-300 flex items-center">
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#F6F4F0] p-6 rounded-lg shadow-lg w-96 border border-[#4DA1A9]">
            <h3 className="text-xl font-bold mb-4 text-[#2E5077]">Edit Profile</h3>
            <input
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="w-full p-2 border border-[#79D7BE] rounded mb-2 bg-[#F6F4F0] text-[#2E5077]"
              placeholder="Name"
            />
            <input
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="w-full p-2 border border-[#79D7BE] rounded mb-2 bg-[#F6F4F0] text-[#2E5077]"
              placeholder="Email"
            />
            <input
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
              className="w-full p-2 border border-[#79D7BE] rounded mb-2 bg-[#F6F4F0] text-[#2E5077]"
              placeholder="Phone"
            />
            <input
              name="company"
              value={editedUser.company}
              onChange={handleChange}
              className="w-full p-2 border border-[#79D7BE] rounded mb-2 bg-[#F6F4F0] text-[#2E5077]"
              placeholder="Company"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSave}
                className="bg-[#2E5077] text-white px-4 py-2 rounded-lg hover:bg-[#4DA1A9] transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-[#4DA1A9] text-white px-4 py-2 rounded-lg hover:bg-[#79D7BE] transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;