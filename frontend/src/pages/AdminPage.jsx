import { Link, Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-white">
      <header className="bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg px-6 py-4 flex justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="EaseLogi Logo" className="h-12 w-auto rounded-lg shadow-md" />
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">EaseLogi</h1>
        </div>
      </header>

      {/* Top Navigation Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "operations" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("operations")}
        >
          Operations Control
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "analytics" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics & Reports
        </button>
      </div>

      {/* Render Active Tab */}
      {activeTab === "operations" && <OperationsControl />}
      {activeTab === "analytics" && <AnalyticsReports />}
    </div>
  );
};

export default AdminPage;
