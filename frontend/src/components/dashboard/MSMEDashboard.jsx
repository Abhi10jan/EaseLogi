import { useState, useEffect } from "react";
import { FaTruck, FaCheckCircle, FaClock } from "react-icons/fa";
import Card from "../ui/Card";
import CardContent from "../ui/CardContent";
import Button from "../ui/Button";

const MSMEDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [pastShipments, setPastShipments] = useState([]);
  const [loadMatches, setLoadMatches] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShipment = {
      id: `SH00${shipments.length + pastShipments.length + 1}`,
      from: formData.get("originCity"),
      to: formData.get("destinationCity"),
      status: "Completed",
      icon: <FaClock className="text-yellow-500" />,
    };
    setShipments([newShipment, ...shipments]);
    setLoadMatches([{ matchScore: Math.floor(Math.random() * 100), savings: Math.floor(Math.random() * 1000), shipmentId: newShipment.id }, ...loadMatches]);
    setShowForm(false);
    e.target.reset();
  };

  useEffect(() => {
    const updatedShipments = shipments.filter((shipment) => shipment.status !== "Completed");
    const completedShipments = shipments.filter((shipment) => shipment.status === "Completed");
    completedShipments.forEach((shipment) => {
      shipment.icon = <FaCheckCircle className="text-green-500" />;
    });
    setShipments(updatedShipments);
    setPastShipments([...completedShipments, ...pastShipments]);
    
    // Remove load matches related to past shipments
    setLoadMatches(loadMatches.filter(match => updatedShipments.some(shipment => shipment.id === match.shipmentId)));
  }, [shipments]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F6F4F0] min-h-screen text-[#2E5077]">
      {/* Active Shipments */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#2E5077]">🚚 Active Shipments</h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {shipments.length === 0 ? (
            <p className="text-[#2E5077] text-lg">No active shipments. Start by adding a new shipment.</p>
          ) : (
            shipments.map((shipment) => (
              <Card key={shipment.id} className="shadow-lg rounded-xl border border-[#4DA1A9] p-4 bg-[#79D7BE]">
                <CardContent className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-[#2E5077]">{shipment.id}</div>
                    <div className="text-[#4DA1A9]">{shipment.from} → {shipment.to}</div>
                    <div className="flex items-center space-x-2 text-[#2E5077] mt-1">
                      {shipment.icon} <span className="text-sm">{shipment.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {/* Load Matching */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[#2E5077]">📦 Load Matching</h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {loadMatches.length === 0 ? (
            <p className="text-[#2E5077] text-lg">No load matches found.</p>
          ) : (
            loadMatches.map((match, index) => (
              <Card key={index} className="shadow-md rounded-xl border border-[#4DA1A9] p-4 bg-[#79D7BE]">
                <CardContent>
                  <div className="mb-2 text-lg font-semibold text-[#2E5077]">Match Score: {match.matchScore}%</div>
                  <div className="w-full bg-[#4DA1A9] rounded-full h-3 mb-3">
                    <div className="bg-[#2E5077] h-3 rounded-full" style={{ width: `${match.matchScore}%` }}></div>
                  </div>
                  <div className="text-green-600 font-semibold">💰 Savings: ₹{match.savings.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Past Shipments Section */}
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-[#2E5077]">📜 Past Shipments</h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {pastShipments.length === 0 ? (
            <p className="text-[#2E5077] text-lg">No past shipments.</p>
          ) : (
            pastShipments.map((shipment) => (
              <Card key={shipment.id} className="shadow-md rounded-xl border border-gray-400 p-4 bg-gray-200">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg text-gray-800">{shipment.id}</div>
                    <div className="text-gray-600">{shipment.from} → {shipment.to}</div>
                    <div className="flex items-center space-x-2 text-gray-800 mt-1">
                      {shipment.icon} <span className="text-sm">{shipment.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      
     
      {/* Past Shipments Section */}
      {/* <div className="col-span-1 md:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-[#2E5077]">📜 Past Shipments</h2>
        <div className="max-h-96 overflow-y-auto space-y-4">
          {pastShipments.length === 0 ? (
            <p className="text-[#2E5077] text-lg">No past shipments.</p>
          ) : (
            pastShipments.map((shipment) => (
              <Card key={shipment.id} className="shadow-md rounded-xl border border-gray-400 p-4 bg-gray-200">
                <CardContent className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg text-gray-800">{shipment.id}</div>
                    <div className="text-gray-600">{shipment.from} → {shipment.to}</div>
                    <div className="flex items-center space-x-2 text-gray-800 mt-1">
                      {shipment.icon} <span className="text-sm">{shipment.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div> */}

      {/* New Shipment Order */}
      <div className="col-span-1 md:col-span-2">
        <Button className="mb-4 bg-[#4DA1A9] hover:bg-[#2E5077] text-white py-2 px-4 rounded-lg" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ New Shipment Order"}
        </Button>

        {showForm && (
          <Card className="p-6 shadow-lg rounded-lg bg-[#F6F4F0] border border-[#4DA1A9]">
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 text-[#2E5077]">📜 Create a New Shipment</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
              <h4 className="col-span-2 font-semibold mt-4 text-[#2E5077]">Origin Information</h4>
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Origin Company Name*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Desired Pickup Time*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Pick-up Address*" required />
              <input name="originCity" type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Origin City*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Zip Code*" required />
        
              <h4 className="col-span-2 font-semibold mt-4 text-[#2E5077]">Destination Information</h4>
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Destination Company Name*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Desired Delivery Date/Time*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Destination Address*" required />
              <input name="destinationCity" type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Destination City*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Zip Code*" required />
        
              <h4 className="col-span-2 font-semibold mt-4 text-[#2E5077]">Shipment Information</h4>
              <input type="number" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Number of Items to Ship*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Packaging Type*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Item Dimensions (inches)*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Total Shipment Weight (lbs)*" required />
              <input type="text" className="p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Commodity*" required />

              <h4 className="col-span-2 font-semibold mt-4 text-[#2E5077]">Delivery Requirements</h4>
              <div className="col-span-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-[#2E5077]" /> Dock High Vehicle Required
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-[#2E5077]" /> Hazmat
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 text-[#2E5077]" /> Truck with Lift Gate Required
                </label>
              </div>
        
              <textarea className="col-span-2 p-2 border border-[#4DA1A9] rounded bg-[#F6F4F0] text-[#2E5077]" placeholder="Notes / Special Requirements (Optional)"></textarea>
               
              
                <Button type="submit" className="col-span-2 mt-4 bg-[#2E5077] hover:bg-[#4DA1A9] text-white py-2 px-4 rounded-lg">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MSMEDashboard;