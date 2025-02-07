import React from "react";

const AnalyticsReports = () => {
  const analytics = [
    { label: "Total Users", value: "5,234" },
    { label: "Total Transactions", value: "₹1.2 Cr" },
    { label: "Support Tickets Open", value: "12" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Analytics & Reports</h2>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {analytics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
            <p className="text-gray-600 text-lg font-semibold">{metric.label}</p>
            <p className="text-2xl font-bold text-blue-700">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue & Shipment Insights */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-700">Revenue & Shipments</h3>
        <p className="text-gray-600">Detailed revenue trends and shipment reports coming soon...</p>
      </div>
    </div>
  );
};

export default AnalyticsReports;
