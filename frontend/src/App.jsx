import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
// import AuthPage from "./pages/AuthPage";
// import DashPage from "./pages/DashPage";
// import LogisticPage from "./pages/logisticPage";
// import AdminPage from "./pages/AdminPage";
// import MSMEDashboard from "./components/dashboard/MSMEDashboard";
// import ProfileDashboard from "./components/dashboard/ProfileDashboard";
// import HelpDashboard from "./components/dashboard/HelpDashboard";
// import LogiProfileDashboard from "./components/logistic_dashboard/ProfileDashboard";
// import LogiHelpDashboard from "./components/logistic_dashboard/HelpDashboard";
// import LogisticsDashboard from "./components/logistic_dashboard/LogisticDashboard";
// import AdminDashboard from "./components/admin_dashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Authentication Pages */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Other routes are commented out */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
