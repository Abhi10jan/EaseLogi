const BASE_URL = "http://localhost:5000/api/auth"; // Update the URL if needed

// Signup User
export const signupUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: error.message };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Store token in localStorage for authenticated requests
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.message };
  }
};
