import axios from "axios";

const API_BASE_URL = "http://localhost:5002/api/help"; // Ensure this matches your backend

// ✅ Fetch FAQs (if implemented in backend)
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

// ✅ Fetch Contact Info (if implemented in backend)
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

// ✅ Send Help Message (User Request)
export const sendMessage = async (message) => {
  try {
    console.log("🔹 API Request: Sending help message...");
    const response = await axios.post(
      `${API_BASE_URL}/send`, // Matches backend route
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

// ✅ Fetch All Help Messages (Admin Only)
export const getAllMessages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching help messages:",
      error.response?.data || error
    );
    return [];
  }
};

// ✅ Admin Replies to Help Message
export const replyToMessage = async (messageId, responseText) => {
  try {
    console.log("🔹 API Request: Sending admin reply...");
    const response = await axios.post(
      `${API_BASE_URL}/reply/${messageId}`,
      { response: responseText },
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
    console.error("❌ Error in replyToMessage:", error.response?.data || error);
    return {
      success: false,
      error: error.response?.data || "An error occurred",
    };
  }
};
