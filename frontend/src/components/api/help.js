import axios from "axios";

const API_BASE_URL = "http://localhost:5002/api/help"; // Ensure this matches your backend

// ✅ Fetch FAQs
export const getFAQs = async () => {
  try {
    console.log("🔹 Fetching FAQs...");
    const response = await axios.get(`${API_BASE_URL}/faqs`);
    console.log("✅ FAQs fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching FAQs:", error.response?.data || error);
    return [];
  }
};

// ✅ Fetch Contact Info
export const getContactInfo = async () => {
  try {
    console.log("🔹 Fetching contact info...");
    const response = await axios.get(`${API_BASE_URL}/contact`);
    console.log("✅ Contact info fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching contact info:",
      error.response?.data || error
    );
    return {};
  }
};

// ✅ Send Message (User Request)
export const sendMessage = async (message) => {
  try {
    console.log("🔹 API Request: Sending message...", { message });

    const response = await axios.post(
      `${API_BASE_URL}/send-message`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in sendMessage:", error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || "An error occurred",
    };
  }
};

// ✅ Fetch All Messages (Admin Only) - FIXED ENDPOINT
export const getAllMessages = async () => {
  try {
    console.log("🔹 Fetching all messages...");
    const response = await axios.get(`${API_BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("✅ All messages fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching messages:", error.response?.data || error);
    return [];
  }
};

// ✅ Admin Replies to Message - FIXED ENDPOINT
export const replyToMessage = async (messageId, responseText) => {
  try {
    console.log("🔹 API Request: Sending admin reply...", {
      messageId,
      responseText,
    });

    const response = await axios.post(
      `${API_BASE_URL}/respond/${messageId}`,
      { response: responseText },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Reply sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in replyToMessage:", error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || "An error occurred",
    };
  }
};
