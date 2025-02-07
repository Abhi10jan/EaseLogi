import { useState, useEffect } from "react";
import { FaQuestionCircle, FaPhone, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { getFAQs, getContactInfo, sendMessage } from "../api/help";

const HelpDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [contact, setContact] = useState({});
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch FAQs and Contact Info on component mount
  useEffect(() => {
    async function fetchData() {
      const faqData = await getFAQs();
      const contactData = await getContactInfo();
      setFaqs(faqData);
      setContact(contactData);
    }
    fetchData();
  }, []);

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setResponseMessage("Message cannot be empty.");
      return;
    }

    try {
      console.log("🔹 Sending message...");
      const response = await sendMessage("user123", message); // Replace "user123" with actual user ID
      console.log("🔹 API Response:", response);

      if (response.success) {
        setResponseMessage("✅ Your message has been sent to support!");
        setMessage("");
      } else {
        setResponseMessage("❌ Failed to send message. Try again.");
      }
    } catch (error) {
      console.error("❌ Error in handleSendMessage:", error);
      setResponseMessage("❌ An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#F6F4F0] shadow-xl rounded-lg border border-[#4DA1A9]">
      <h2 className="text-3xl font-bold mb-6 flex items-center text-[#2E5077]">
        <FaQuestionCircle className="mr-2 text-[#4DA1A9]" /> Help & Support
      </h2>

      {/* FAQs Section */}
      <h3 className="text-lg font-semibold mb-2 text-[#2E5077]">📌 Frequently Asked Questions</h3>
      <ul className="list-disc pl-5 space-y-2 text-[#2E5077]">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <li key={index} className="border-l-4 border-[#4DA1A9] pl-2">
              <strong>{faq.question}</strong> - {faq.answer}
            </li>
          ))
        ) : (
          <li>Loading FAQs...</li>
        )}
      </ul>

      {/* Contact Support Section */}
      <h3 className="text-lg font-semibold mt-6 text-[#2E5077]">📞 Contact Support</h3>
      <div className="flex items-center space-x-3 text-[#2E5077]">
        <FaPhone className="text-[#4DA1A9]" />
        <span>{contact.phone || "+91 12345 67890"}</span>
      </div>
      <div className="flex items-center space-x-3 mt-2 text-[#2E5077]">
        <FaEnvelope className="text-[#4DA1A9]" />
        <span>{contact.email || "support@easelogi.com"}</span>
      </div>

      {/* Send Message Section */}
      <h3 className="text-lg font-semibold mt-6 text-[#2E5077]">💬 Send us your question</h3>
      <div className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-[#79D7BE] rounded bg-[#F6F4F0] text-[#2E5077]"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-[#2E5077] text-white px-4 py-2 rounded-lg hover:bg-[#4DA1A9] transition duration-300 flex items-center"
        >
          <FaPaperPlane className="mr-1" /> Send
        </button>
      </div>

      {/* Response Message */}
      {responseMessage && (
        <p
          className={`mt-3 text-sm ${
            responseMessage.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default HelpDashboard;