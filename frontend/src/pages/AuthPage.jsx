import { Outlet } from "react-router-dom";
import logo from "../assets/logo.jpg";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-500 to-pink-500 flex flex-col justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center mb-8">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 mb-2">
            <img src={logo} alt="EaseLogi Logo" className="h-14 w-auto rounded-lg shadow-md" />
            <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">EaseLogi</h1>
          </div>

          {/* Description */}
          <p className="text-center text-white/75 text-lg max-w-md">
            Streamline your logistics operations with our comprehensive platform
          </p>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
