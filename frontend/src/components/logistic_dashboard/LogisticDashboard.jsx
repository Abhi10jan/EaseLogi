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

  const loads = [
    { route: "Mumbai → Delhi", price: 45000 },
    { route: "Bangalore → Chennai", price: 28000 },
    { route: "Pune → Hyderabad", price: 32000 },
  ];

  const filteredLoads = loads
    .filter((load) => load.route.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (sortBy === "price" ? a.price - b.price : a.route.localeCompare(b.route)));

  const metrics = [
    { label: "On-Time Delivery", value: "94%" },
    { label: "Customer Rating", value: "4.8/5" },
    { label: "Revenue This Month", value: "₹2,45,000" },
  ];

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
    const newBid = { route: filteredLoads[index].route, amount: bids[index], status: "Pending" };
    setBidHistory([...bidHistory, newBid]);
    setConfirmation({ ...confirmation, [index]: `Bid submitted for ${filteredLoads[index].route}: ₹${bids[index]}` });
    setSubmittedBids({ ...submittedBids, [index]: true });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Available Loads */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Available Loads</h2>
        <input
          type="text"
          placeholder="Search loads..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-full mb-4"
        />
        <select onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded-lg mb-4">
          <option value="route">Sort by Route</option>
          <option value="price">Sort by Price</option>
        </select>
        <div className="space-y-4">
          {filteredLoads.map((load, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg flex flex-col items-start">
              <div className="w-full flex justify-between items-center">
                <div>
                  <p className="text-md font-medium">{load.route}</p>
                  <p className="text-lg font-bold">₹{load.price.toLocaleString()}</p>
                </div>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={() => handleBidClick(index)}
                >
                  Bid Now
                </button>
              </div>
              {showInput === index && (
                <div className="mt-2 w-full flex flex-col">
                  <input
                    type="text"
                    placeholder="Enter your bid"
                    value={bids[index] || ""}
                    onChange={(event) => handleInputChange(event, index)}
                    className="p-2 border rounded-lg"
                  />
                  {errors[index] && <p className="text-red-500 text-sm mt-1">{errors[index]}</p>}
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

      {/* Bid History */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Bid History</h2>
        <div className="space-y-4">
          {bidHistory.map((bid, index) => (
            <div key={index} className="p-4 border rounded-lg flex justify-between">
              <div>
                <p className="text-md font-medium">{bid.route}</p>
                <p className="text-lg font-bold">₹{bid.amount}</p>
              </div>
              <p className="text-md font-semibold text-gray-700">{bid.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
