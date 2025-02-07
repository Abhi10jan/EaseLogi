import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Ensure the correct path to your logo

const DashPage = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F6F4F0] to-[#79D7BE]">
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <header className="bg-gradient-to-r from-[#2E5077] to-[#4DA1A9] shadow-lg px-6 py-4 flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="EaseLogi Logo" className="h-12 w-auto rounded-lg shadow-md" />
            <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">EaseLogi</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link to="/dashboard/msme" className="px-5 py-2 bg-[#79D7BE] text-[#2E5077] font-semibold rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300">
              Home
            </Link>
            <Link to="/dashboard/profile" className="px-5 py-2 bg-[#79D7BE] text-[#2E5077] font-semibold rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300">
              Profile
            </Link>
            <Link to="/dashboard/help" className="px-5 py-2 bg-[#79D7BE] text-[#2E5077] font-semibold rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300">
              Help
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-[#F6F4F0] text-[#2E5077] shadow-inner rounded-lg overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashPage;