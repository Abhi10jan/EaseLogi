import { useState, useEffect } from "react";
import { FaPaperPlane, FaEnvelope } from "react-icons/fa";
import { getAllMessages, replyToMessage } from "../api/help"; // Import API

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        console.log("Fetching messages...");
        const data = await getAllMessages();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to fetch messages. Please try again.");
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const pendingMessages = messages.filter((msg) => !msg.replied).length;

  const handleReplyChange = (id, value) => {
    setReplies((prev) => ({ ...prev, [id]: value }));
  };

  const handleReply = async (id) => {
    if (!replies[id]?.trim()) return;

    setSending(true);
    try {
      const response = await replyToMessage(id, replies[id]); // Call API
      if (response.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === id ? { ...msg, replied: true, reply: replies[id] } : msg
          )
        );
        setReplies((prev) => ({ ...prev, [id]: "" }));
        setSelectedMessage(null);
      } else {
        console.error("Reply failed:", response.error);
      }
    } catch (err) {
      console.error("Error sending reply:", err);
    }
    setSending(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-[#2E5077] border border-[#4DA1A9]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">📩 Customer Messages</h2>
        <button className="flex items-center px-4 py-2 bg-[#79D7BE] text-[#2E5077] font-semibold rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300">
          <FaEnvelope className="mr-2" /> Messages ({pendingMessages})
        </button>
      </div>

      {loading && <p>Loading messages...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {messages.length > 0
          ? messages.map((msg) => (
              <div
                key={msg._id}
                className="p-4 border rounded-lg shadow-md bg-[#F6F4F0]"
              >
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
                    <button
                      onClick={() => setSelectedMessage(msg._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Reply
                    </button>
                  )}
                </div>

                {selectedMessage === msg._id && (
                  <div className="mt-4 p-4 border-t">
                    <h3 className="text-lg font-bold mb-2">
                      Reply to {msg.sender}
                    </h3>
                    <textarea
                      value={replies[msg._id] || ""}
                      onChange={(e) =>
                        handleReplyChange(msg._id, e.target.value)
                      }
                      placeholder="Type your reply here..."
                      className="w-full p-2 border border-[#79D7BE] rounded bg-[#F6F4F0] text-[#2E5077]"
                    />
                    <button
                      onClick={() => handleReply(msg._id)}
                      className="mt-2 bg-[#79D7BE] text-[#2E5077] px-4 py-2 rounded-lg shadow-md hover:bg-[#4DA1A9] transition duration-300 flex items-center"
                      disabled={sending}
                    >
                      {sending ? (
                        "Sending..."
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" /> Send Reply
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))
          : !loading && <p>No messages yet.</p>}
      </div>
    </div>
  );
};

export default Messages;
