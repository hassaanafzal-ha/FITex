import React, { useState } from "react";
import axios from "axios";
import "./SignUpPage.css"; // Import the CSS for styling

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post("http://localhost:5000/api/signup", formData);

      // Handle successful registration
      if (response.status === 201) {
        setSuccessMessage("Registration successful! Please log in.");
        setErrorMessage("");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        // Backend responded with an error
        setErrorMessage(error.response.data.message || "An error occurred. Please try again later.");
      } else if (error.request) {
        // No response received from the backend
        setErrorMessage("No response received from the server. Please check your connection.");
      } else {
        // Some other error occurred
        setErrorMessage("An error occurred while processing your request.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="sign-up-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{" "}
        <span
          onClick={() => window.location.href = "/LoginPage"}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login here
        </span>
      </p>
    </div>
  );
};

export default SignUpPage;
