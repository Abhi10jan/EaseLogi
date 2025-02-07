import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashPage from "./pages/DashPage"; // Import DashPage here
import LogisticPage from "./pages/logisticPage";
import AdminPage from "./pages/AdminPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import MSMEDashboard from "./components/dashboard/MSMEDashboard";
import ProfileDashboard from "./components/dashboard/ProfileDashboard";
import HelpDashboard from "./components/dashboard/HelpDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProfileDashboard from "./components/admin_dashboard/ProfileDashboard";
import LogiProfileDashboard from "./components/logistic_dashboard/ProfileDashboard";
import LogiHelpDashboard from "./components/logistic_dashboard/HelpDashboard";
import LogisticsDashboard from "./components/logistic_dashboard/LogisticDashboard";
import AdminMessages from "./components/dashboard/Messages";
import AdminDashboard from "./components/admin_dashboard/AdminDashboard";
import Messages from "./components/admin_dashboard/Messages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Authentication Pages */}

        <Route path="/auth" element={<AuthPage />}>
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="" element={<DashPage />}>
            <Route path="msme" element={<MSMEDashboard />} />
            <Route path="profile" element={<ProfileDashboard />} />
            <Route path="help" element={<HelpDashboard />} />
            <Route path="msmeMessages" element={<AdminMessages />} />
          </Route>
        </Route>


        <Route path="/logidashboard" element={<ProtectedRoute />}>
        <Route path="" element={<LogisticPage />}>
          <Route path="logistic" element={<LogisticsDashboard />} />
          <Route path="logiprofile" element={<LogiProfileDashboard />} />
          <Route path="logihelp" element={<LogiHelpDashboard />} />
        </Route>
        </Route>

        <Route path="/admin_dashboard" element={<ProtectedRoute />}>
         <Route path="" element={<AdminPage />} >
           <Route path="admin" element={<AdminDashboard />} />
           <Route path="adminprofile" element={<AdminProfileDashboard />} />
           <Route path="Messages" element={<Messages />} />
         </Route>
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
