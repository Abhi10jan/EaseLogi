import axios from "axios";

const API_URL = "http://localhost:5002/api/msme"; // Update with your backend URL

export const createShipment = async (shipmentData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, shipmentData, {
      withCredentials: true, // Necessary if backend has cookie-based authentication
    });
    return response.data;
  } catch (error) {
    console.error("Error creating shipment:", error);
    throw error;
  }
};

export const fetchShipments = async () => {
  try {
    const response = await axios.get(`${API_URL}/shipments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return [];
  }
};

export const fetchMatchedShipments = async () => {
  try {
    const response = await axios.get(`${API_URL}/matched-shipments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching matched shipments:", error);
    return [];
  }
};

export const trackShipment = async (shipmentId) => {
  try {
    const response = await axios.get(`${API_URL}/track/${shipmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error tracking shipment:", error);
    throw error;
  }
};
