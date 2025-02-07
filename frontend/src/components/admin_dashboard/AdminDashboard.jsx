import React, { useState } from "react";
import OperationsControl from "./OperationsControl";
import AnalyticsReports from "./AnalyticsReports";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("operations");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

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

export default AdminDashboard;
