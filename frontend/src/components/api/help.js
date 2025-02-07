import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/help"; // Ensure this matches your backend

// ✅ Fetch FAQs
export const getFAQs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faqs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching FAQs:", error.response?.data || error);
    return [];
  }
};

// ✅ Fetch Contact Info
export const getContactInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/contact`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching contact info:",
      error.response?.data || error
    );
    return {};
  }
};

// ✅ Send Message
export const sendMessage = async (userId, message) => {
  try {
    console.log("🔹 API Request: Sending message...");
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
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in sendMessage:", error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || "An error occurred",
    };
  }
};
