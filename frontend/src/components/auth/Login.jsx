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
    <div className="auth-card">
      <div className="auth-card-header">
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Login to EaseLogi
        </h2>
      </div>
      <div className="auth-card-body">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Select Role</label>
              <select
                className="form-input"
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
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="input-error">{error}</p>}

            <div className="flex justify-end mt-2">
              <Link
                to="/auth/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary mt-4 w-full">
              Login
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/auth/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
