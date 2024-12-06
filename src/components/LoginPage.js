import React, { useState } from "react";
import fitnessLogo from "./images/fitness-people.png";
import logoIcon from "./images/logo.png";
import statisfiedCustomer from "./images/statisfiedCustomer.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./LoginPage.css"; // Import the CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [logerrorMessage, setLogErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleGetUser = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setLogErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      // Send the login data to the backend using axios
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
	
	localStorage.setItem("authToken", response.data.token);  // Save token (if needed)
        localStorage.setItem("userEmail", response.data.user.email);  // Save email
        localStorage.setItem("userName", response.data.user.name);    // Save name

        // Redirect the user to the home page 
        navigate("/homePage");
      } else {
        // Show error message if login fails
        setLogErrorMessage(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(error);
      setLogErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="loginPage-login-page">
      {/* Left Section */}
      <div className="loginPage-left-section">
        <h1>Helps for your ideal body fitness</h1>
        <p>
          Motivate users with benefits and positive reinforcement, and offer
          modifications and progress tracking.
        </p>
        <form className="loginPage-login-form" onSubmit={handleGetUser}>
          <div className="input-group">
            <label>Email or Mobile Number</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="loginPage-password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
              <button
                type="button"
                className="loginPage-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {logerrorMessage && <p style={{ color: "red" }}>{logerrorMessage}</p>}
          <button type="submit" className="loginPage-login-button">
            Log In
          </button>
        </form>
        <p>
          Don't have an account? <span onClick={() => navigate("/SignUpPage")} style={{ color: 'blue', cursor: 'pointer' }}>Sign up here</span>
        </p>
      </div>

      {/* Center Image Section */}
      <div className="loginPage-image-section">
        <span className="loginPage-vertical-text">Fitness</span>
        <img src={fitnessLogo} alt="Fitness Models" className="fitness-model" />
      </div>

      {/* Right Section (No signup form here) */}
      <div className="loginPage-right-section">
        {/* Satisfied Customers Section */}
        <div className="loginPage-satisfied-customers">
          <img
            src={statisfiedCustomer}
            alt="Satisfied Customers"
            className="customer-avatars"
          />
          <span>10k+ Satisfied Customer</span>
        </div>

        <div className="loginPage-registration-background">
          <img
            src={logoIcon}
            alt="Background Icon"
            className="background-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
