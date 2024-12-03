import React, { useState } from "react";
import "./LaunchPage.css";
import launchLogo from "./images/launchLogo.png";
import launchPic from "./images/launchPic.png";
import launchRobot from "./images/launchRobot.png";
import { useNavigate } from "react-router-dom";

const LaunchPage = () => {
  const navigate = useNavigate();

  // State for showing phone number modal
  const [isPhoneModalVisible, setPhoneModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle phone number modal visibility
  const handlePhoneButtonClick = () => {
    setPhoneModalVisible(true); // Show the phone number modal
  };

  const handlePhoneSubmit = () => {
    // You can handle the phone number verification logic here
    alert(`Phone number ${phoneNumber} submitted.`);
    setPhoneModalVisible(false);
  };

  // Handle the Sign-Up button click
  const handleSignUpClick = () => {
    navigate("/loginPage");
  };

  // Google login click (you can integrate Google OAuth here)
  const handleGoogleSignIn = () => {
    alert("Google Sign-In button clicked");
    // Implement Google OAuth flow here
  };

  return (
    <div className="launchPage-launch-page-container">
      {/* Left Section */}
      <div className="launchPage-left-section">
        <div className="launchPage-main-content">
          {/* Logo beside text */}
          <img src={launchLogo} alt="Logo" className="launchPage-logo-image" />
          <div className="launchPage-text-and-actions">
            <h2 className="launchPage-app-title">FITex</h2>
            <div className="launchPage-features">
              <ul>
                <li>✔ Automatic BMI</li>
                <li>✔ AI Assistant</li>
                <li>✔ Daily Motivations</li>
              </ul>
            </div>
            <div className="launchPage-actions">
              {/* Sign Up Button */}
              <button
                className="launchPage-btn launchPage-primary"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>
              {/* Continue with Phone Number Button */}
              <button
                className="launchPage-btn launchPage-secondary"
                onClick={handlePhoneButtonClick}
              >
                Continue with Phone Number
              </button>
              {/* Continue with Google Button */}
              <button
                className="launchPage-btn launchPage-google"
                onClick={handleGoogleSignIn}
              >
                Continue with Google
              </button>
              <a href="/" className="launchPage-login-link">Log in</a>
              <img src={launchRobot} alt="Robot" className="launchPage-robot-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="launchPage-right-section">
        <img src={launchPic} alt="Fitness Motivation" className="launchPage-large-image" />
      </div>

      {/* Phone Number Modal */}
      {isPhoneModalVisible && (
        <div className="phone-modal">
          <div className="phone-modal-content">
            <h3>Enter Your Phone Number</h3>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handlePhoneSubmit}>Submit</button>
            <button onClick={() => setPhoneModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchPage;
