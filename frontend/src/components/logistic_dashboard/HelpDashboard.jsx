import { useState } from "react";
import { FaQuestionCircle, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const HelpDashboard = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      alert("Your message has been sent to support!");
      setMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <FaQuestionCircle className="mr-2 text-blue-500" /> Help & Support
      </h2>
      
      <h3 className="text-lg font-semibold mb-2">📌 Frequently Asked Questions</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>How do I track my shipments?</li>
        <li>How do I create a new shipment order?</li>
        <li>Can I update my shipment details after booking?</li>
        <li>How do I contact customer support?</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">📞 Contact Support</h3>
      <div className="flex items-center space-x-3">
        <FaPhone className="text-green-500" />
        <span>+91 12345 67890</span>
      </div>
      <div className="flex items-center space-x-3 mt-2">
        <FaEnvelope className="text-red-500" />
        <span>support@easelogi.com</span>
      </div>

      <h3 className="text-lg font-semibold mt-6">💬 Send us your question </h3>
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center">
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </div>
    </div>
  );
};

export default HelpDashboard;
