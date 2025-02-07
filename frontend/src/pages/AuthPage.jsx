import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-[#D3D9D4] flex flex-col justify-center">
      <div className="container mx-auto px-4 py-16">

        <div className="flex flex-col items-center ">
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3 mb-2">
            <img src={logo} alt="EaseLogi Logo" className="h-14 w-auto rounded-lg shadow-md" />
            <h1 className="text-4xl font-extrabold text-[#2E5077] tracking-wide drop-shadow-lg">EaseLogi</h1>
          </div>

          {/* Description */}
          <p className="text-center text-[#2E5077] text-lg max-w-md mb-8">

            Streamline your logistics operations with our comprehensive platform
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
