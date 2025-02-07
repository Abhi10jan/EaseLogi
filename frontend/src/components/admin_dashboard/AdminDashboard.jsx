import React, { useState } from "react";
import OperationsControl from "./OperationsControl";
import AnalyticsReports from "./AnalyticsReports";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("operations");

  return (
    <div className="p-6 min-h-screen bg-[#F6F4F0]">
      
      {/* Top Navigation Tabs */}
      <div className="flex space-x-4 border-b border-[#2E5077] mb-4">
        <button
          className={`px-5 py-2 mb-1.5 rounded-lg transition duration-300 ${
            activeTab === "operations" 
              ? "bg-[#4DA1A9] text-white font-bold shadow-md" 
              : "text-[#2E5077] hover:bg-[#79D7BE] hover:text-white"
          }`}
          onClick={() => setActiveTab("operations")}
        >
          Operations Control
        </button>
        <button
          className={`px-5 py-2 mb-1.5 rounded-lg transition duration-300 ${
            activeTab === "analytics" 
              ? "bg-[#4DA1A9] text-white font-bold shadow-md" 
              : "text-[#2E5077] hover:bg-[#79D7BE] hover:text-white"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics & Reports
        </button>
      </div>

      {/* Render Active Tab */}
      <div className="p-4 bg-white rounded-lg shadow-lg border border-[#2E5077]">
        {activeTab === "operations" && <OperationsControl />}
        {activeTab === "analytics" && <AnalyticsReports />}
      </div>
    </div>
  );
};

export default AdminDashboard;
