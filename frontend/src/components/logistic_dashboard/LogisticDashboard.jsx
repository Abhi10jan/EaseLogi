import React, { useState } from "react";

const LogisticsDashboard = () => {
  const [bids, setBids] = useState({});
  const [submittedBids, setSubmittedBids] = useState({});
  const [showInput, setShowInput] = useState(null);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("route");
  const [bidHistory, setBidHistory] = useState([]);
  const [trackingInfo, setTrackingInfo] = useState({});
  const [activeTab, setActiveTab] = useState("loads");

  // Convert loads into state so we can remove items dynamically
  const [loads, setLoads] = useState([
    { route: "Mumbai → Delhi", price: 45000 },
    { route: "Bangalore → Chennai", price: 28000 },
    { route: "Pune → Hyderabad", price: 32000 },
  ]);

  const filteredLoads = loads
    .filter((load) => load.route.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortBy === "price" ? a.price - b.price : a.route.localeCompare(b.route)));

  const handleBidClick = (index) => {
    setShowInput(showInput === index ? null : index);
    setErrors({ ...errors, [index]: "" });
  };

  const handleInputChange = (event, index) => {
    setBids({ ...bids, [index]: event.target.value });
    setErrors({ ...errors, [index]: "" });
  };

  const handleSubmitBid = (index) => {
    if (!bids[index] || isNaN(bids[index]) || Number(bids[index]) <= 0) {
      setErrors({ ...errors, [index]: "Please enter a valid amount." });
      return;
    }
  
    // Find the correct load by matching the route from filteredLoads
    const correctLoad = loads.find((load) => load.route === filteredLoads[index].route);
  
    if (!correctLoad) {
      setErrors({ ...errors, [index]: "Load not found." });
      return;
    }
  
    // Create new bid object
    const newBid = { route: correctLoad.route, amount: bids[index], status: "Pending" };
  
    // Remove the correct load from available loads
    setLoads((prevLoads) => prevLoads.filter((load) => load.route !== correctLoad.route));
  
    // Update bid history correctly
    setBidHistory((prevBids) => [...prevBids, newBid]);
  
    // Clear confirmation for previously submitted bids
    setConfirmation({ ...confirmation, [index]: `Bid submitted for ${correctLoad.route}: ₹${bids[index]}` });
  
    // Mark the bid as submitted
    setSubmittedBids({ ...submittedBids, [index]: true });
  
    // Reset input field
    setBids({ ...bids, [index]: "" });
  };
  
  const handleTrackShipment = (index) => {
    const locations = ["Warehouse", "On the way", "Arriving Soon", "Delivered"];
    let currentLocation = 0;

    const interval = setInterval(() => {
      setTrackingInfo((prev) => ({
        ...prev,
        [index]: locations[currentLocation],
      }));
      if (currentLocation === locations.length - 1) clearInterval(interval);
      currentLocation++;
    }, 2000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "loads" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("loads")}
        >
          Available Loads
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "bids" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("bids")}
        >
          Bid History
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "shipments" ? "border-b-2 border-blue-500 font-bold" : ""}`}
          onClick={() => setActiveTab("shipments")}
        >
          Active Shipments
        </button>
      </div>

      {/* Available Loads */}
      {activeTab === "loads" && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Available Loads</h2>
          <input
            type="text"
            placeholder="Search loads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg w-full mb-4"
          />
          <div className="space-y-4">
            {filteredLoads.map((load, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-md font-medium">{load.route}</p>
                <p className="text-lg font-bold">₹{load.price.toLocaleString()}</p>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2"
                  onClick={() => handleBidClick(index)}
                >
                  Bid Now
                </button>
                {showInput === index && (
                  <div className="mt-2 flex flex-col">
                    <input
                      type="text"
                      placeholder="Enter your bid"
                      value={bids[index] || ""}
                      onChange={(event) => handleInputChange(event, index)}
                      className="p-2 border rounded-lg"
                    />
                    <button
                      className="px-4 py-2 mt-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      onClick={() => handleSubmitBid(index)}
                    >
                      Submit
                    </button>
                    {confirmation[index] && <p className="text-green-500 text-sm mt-1">{confirmation[index]}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bid History */}
      {activeTab === "bids" && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Bid History</h2>
          {bidHistory.length === 0 ? (
            <p className="text-gray-500">No bids submitted yet.</p>
          ) : (
            bidHistory.map((bid, index) => (
              <div key={index} className="p-4 border rounded-lg flex justify-between">
                <p className="text-md font-medium">{bid.route}</p>
                <p className="text-lg font-bold">₹{bid.amount}</p>
                <p className={`text-md font-semibold ${bid.status === "Pending" ? "text-yellow-500" : "text-green-600"}`}>
                  {bid.status}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Active Shipments */}
      {activeTab === "shipments" && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Active Shipments</h2>
          {bidHistory.filter((bid) => bid.status === "In Transit").length === 0 ? (
            <p className="text-gray-500">No active shipments.</p>
          ) : (
            bidHistory
              .filter((bid) => bid.status === "In Transit")
              .map((shipment, index) => (
                <div key={index} className="p-4 border rounded-lg flex justify-between">
                  <p className="text-md font-medium">{shipment.route}</p>
                  <p className="text-lg font-bold">₹{shipment.amount}</p>
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    onClick={() => handleTrackShipment(index)}
                  >
                    Live Track
                  </button>
                  <p className="text-gray-700">{trackingInfo[index] || "Awaiting tracking update..."}</p>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default LogisticsDashboard;
