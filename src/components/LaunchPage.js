import React from "react";
import "./LaunchPage.css";
import launchLogo from "./images/launchLogo.png";
import launchPic from "./images/launchPic.png";
import launchRobot from "./images/launchRobot.png";

const LaunchPage = () => {
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
              <button className="launchPage-btn launchPage-primary">Sign up</button>
              <button className="launchPage-btn launchPage-secondary">Continue with Phone Number</button>
              <button className="launchPage-btn launchPage-google">Continue with Google</button>
              <a href="/" className="launchPage-login-link">
                Log in
              </a>
              <img src={launchRobot} alt="Robot" className="launchPage-robot-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="launchPage-right-section">
        <img src={launchPic} alt="Fitness Motivation" className="launchPage-large-image" />
      </div>
    </div>
  );
};

export default LaunchPage;
