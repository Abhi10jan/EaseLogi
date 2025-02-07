import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MSME"); // Default role selection
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setError("");
    const userData = { email, password, role };

    try {
      const response = await loginUser(userData);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", role);

        // Redirect user based on role
        if (role === "MSME") {
          navigate("/dashboard/msme");
        } else if (role === "Provider") {
          navigate("/logidashboard/logistic");
        } else {
          navigate("/admin_dashboard/admin");
        }
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center  bg-[#D3D9D4]">
      <div className="bg-[#F6F4F0] p-8 rounded-xl shadow-lg border border-[#2E5077] w-full max-w-md">
        <h2 className="text-2xl font-semibold text-[#2E5077] text-center mb-4">
          Login to EaseLogi
        </h2>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-[#2E5077] font-medium">Select Role</label>
              <select
                className="w-full p-2 border border-[#2E5077] rounded-lg bg-white text-[#2E5077]"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="MSME">MSME</option>
                <option value="Provider">Provider</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-[#2E5077] font-medium">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-[#2E5077] rounded-lg bg-white text-[#2E5077]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-[#2E5077] font-medium">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-[#2E5077] rounded-lg bg-white text-[#2E5077]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end mt-2">
              <Link to="/auth/forgot-password" className="text-[#4DA1A9] text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="w-full p-3 bg-[#4DA1A9] hover:bg-[#79D7BE] text-white font-semibold rounded-lg transition duration-300">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-[#2E5077]">Don't have an account? </span>
          <Link to="/auth/signup" className="text-[#4DA1A9] font-medium hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
