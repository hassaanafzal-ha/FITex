import React from "react";
import "./HomePage.css";
import homePic from "./images/homePic.png";

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Transparent Header */}
      <div className="transparent-header">
        <h1>HOMEPAGE</h1>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Section */}
        <div className="header">
          <p>Welcome To Your Home</p>
        </div>

        {/* Card Section */}
        <div className="cards-section">
          <div className="card">
            <h3>Cardio Strength</h3>
            <p>Boost your heart health and stamina with focused cardio exercises.</p>
          </div>
          <div className="card active">
            <h3>Fat Loss</h3>
            <p>Accelerate fat burning with tailored workout and nutrition plans.</p>
          </div>
          <div className="card">
            <h3>Muscle Gain</h3>
            <p>Build muscle strength with effective training and proper guidance.</p>
          </div>
          <div className="card">
            <h3>Nutritions</h3>
            <p>Optimize your diet with personalized nutrition and meal planning.</p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="navigation-arrows">
          <button className="arrow-button">❮</button>
          <button className="arrow-button">❯</button>
        </div>

        {/* Profile Completion Section */}
        <div className="profile-completion-section">
          <p>
            Enhance user experience with healthy nutrition tips, support resources, 
            and social elements. Set your Data now.
          </p>
          <button className="profile-button">Complete Your Profile</button>
          <div className="emoji">
            <img
              src= {homePic}
              alt="Motivational Character"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
