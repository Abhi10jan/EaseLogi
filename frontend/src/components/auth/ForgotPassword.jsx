import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your forgot password logic here (e.g., API call to send reset email)
    setMessage(
      "If an account exists with this email, a reset link will be sent."
    );
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2 className="text-2xl font-semibold text-gray-700">
          Forgot Password
        </h2>
      </div>
      <div className="auth-card-body">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Reset Link
            </button>
          </div>
        </form>
        {message && <p className="text-sm text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
