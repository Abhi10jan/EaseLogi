import { useState } from "react";
import { FaPaperPlane, FaEnvelope } from "react-icons/fa";

const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Customer1", message: "How can I track my shipment?", replied: false, reply: "" },
    { id: 2, sender: "Customer2", message: "I need help with my order.", replied: true, reply: "Thank you for reaching out!" },
  ]);
  const [replies, setReplies] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);

  const pendingMessages = messages.filter(msg => !msg.replied).length;

  const handleReplyChange = (id, value) => {
    setReplies({ ...replies, [id]: value });
  };

  const handleReply = (id) => {
    if (!replies[id]?.trim()) return;
    setMessages((prev) => prev.map(msg => msg.id === id ? { ...msg, replied: true, reply: replies[id] } : msg));
    setReplies({ ...replies, [id]: "" });
    setSelectedMessage(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-[#2E5077] border border-[#4DA1A9]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📩 Customer Messages</h2>
        <button className="flex items-center px-4 py-2 bg-[#79D7BE] text-[#2E5077] font-semibold rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300">
          <FaEnvelope className="mr-2" /> Messages ({pendingMessages})
        </button>
      </div>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="p-4 border rounded-lg shadow-md bg-[#F6F4F0]">
            <p className="font-semibold">{msg.sender}:</p>
            <p className="text-gray-700">{msg.message}</p>
            {msg.replied && (
              <div className="mt-2 p-2 bg-[#79D7BE] text-[#2E5077] rounded">
                <p className="font-semibold">Admin Reply:</p>
                <p>{msg.reply}</p>
              </div>
            )}
            <div className="mt-2">
              {msg.replied ? (
                <span className="text-green-600 font-bold">Replied ✅</span>
              ) : (
                <button onClick={() => setSelectedMessage(msg.id)} className="text-blue-600 hover:underline">
                  Reply
                </button>
              )}
            </div>
            {selectedMessage === msg.id && (
              <div className="mt-4 p-4 border-t">
                <h3 className="text-lg font-bold mb-2">Reply to {msg.sender}</h3>
                <textarea
                  value={replies[msg.id] || ""}
                  onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                  placeholder="Type your reply here..."
                  className="w-full p-2 border border-[#79D7BE] rounded bg-[#F6F4F0] text-[#2E5077]"
                />
                <button
                  onClick={() => handleReply(msg.id)}
                  className="mt-2 bg-[#79D7BE] text-[#2E5077] px-4 py-2 rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300 flex items-center"
                >
                  <FaPaperPlane className="mr-2" /> Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
