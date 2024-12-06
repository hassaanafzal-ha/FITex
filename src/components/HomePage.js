import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import homePic from "./images/homePic.png";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dailyTip, setDailyTip] = useState("");
  const [currentDate, setCurrentDate] = useState(""); // State for current date
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username and email from localStorage
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    setUserName(name || "Guest");
    setUserEmail(email || ""); // Empty if not logged in

    // Array of fitness tips
    const tips = [
      "Stay hydrated – drink at least 8 glasses of water daily.",
      "Consistency is the key to fitness success.",
      "Stretch before and after your workouts to prevent injury.",
      "Eat a balanced diet with plenty of vegetables and lean protein.",
      "Take rest days to allow your muscles to recover and grow.",
      "Aim for at least 30 minutes of exercise daily.",
      "Set realistic fitness goals and track your progress.",
      "A good night's sleep is as important as a good workout.",
      "Don't skip warm-ups – prepare your body for intense activity.",
      "Find a workout you enjoy to stay motivated.",
    ];

    // Select a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setDailyTip(randomTip);

    // Set current date
    const today = new Date();
    const dateString = today.toLocaleDateString(); // Get the current date in a readable format
    setCurrentDate(dateString);
  }, []);

  // Handle card click
  const handleCardClick = async (title) => {
    if (!userEmail) {
      // Proceed without storing data if user is not logged in
      navigate("/BMI");
      return;
    }

    try {
      // Save selected fitness plan to the backend
      await axios.post("http://localhost:5000/api/fitness-plan", {
        email: userEmail,
        title,
      });

      // Redirect to the BMI page
      navigate("/BMI");
    } catch (error) {
      console.error("Error saving fitness plan:", error);
    }
  };

  return (
    <div className="homepage-container">
      {/* Transparent Header */}
      <div className="transparent-header">
        <h1>Welcome Home</h1>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Section */}
        <div className="header">
          <p>Welcome, <span className="username">{userName}</span>!</p>
        </div>

        {/* Current Date Section */}
        <div className="current-date">
          <h3>Today's Date: {currentDate}</h3>
        </div>

        {/* Daily Fitness Tip */}
        <div className="daily-tip">
          <h2>💡 Daily Fitness Tip</h2>
          <p>{dailyTip}</p>
        </div>

        {/* Fitness Goals Cards */}
        <div className="cards-section">
          {[ 
            { title: "Cardio Strength", text: "Boost your heart health and stamina with focused cardio exercises." },
            { title: "Fat Loss", text: "Accelerate fat burning with tailored workout and nutrition plans." },
            { title: "Muscle Gain", text: "Build muscle strength with effective training and proper guidance." },
            { title: "Nutritions", text: "Optimize your diet with personalized nutrition and meal planning." },
          ].map((card, index) => (
            <div
              className={`card ${index === 1 ? "active" : ""}`}
              key={index}
              onClick={() => handleCardClick(card.title)} // Make card clickable
            >
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        {/* Profile Completion Section */}
        <div className="profile-completion-section">
          <p>
            Enhance your fitness journey with healthy tips, support resources, and social engagement. 
            Update your profile to unlock personalized experiences!
          </p>
          <button className="profile-button" onClick={() => navigate("/BMI")}>
            Complete Your Profile
          </button>
        </div>

        {/* Motivational Image */}
        <div className="motivational-image">
          <img src={homePic} alt="Motivational Character" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
