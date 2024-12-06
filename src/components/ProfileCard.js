import React from "react";
import "./ProfileCard.css";
import logo from "./images/sniper.png";
import { useUser } from "../UserContext";

function ProfileCard() {
  const { user } = useUser();

  // Retrieve the username from localStorage if not available in the user object
  const userName = user?.name || localStorage.getItem("userName") || "Guest";
  const userEmail = user?.email || localStorage.getItem("userEmail") || "guest@example.com";

  return (
    <div className="profile-card">
      <img src={logo} alt="User Picture" />
      <h3>{userName}</h3>
      <p>{userEmail}</p>
      <p>Birthday: June 8th</p>

      <div className="user-info-grid">
        <div className="info-item">
          <p className="info-value">66 Kg</p>
          <p className="info-label">Weight</p>
        </div>
        <div className="info-item">
          <p className="info-value">22</p>
          <p className="info-label">Years Old</p>
        </div>
        <div className="info-item">
          <p className="info-value">181.2 CM</p>
          <p className="info-label">Height</p>
        </div>
      </div>

      <div className="running-emoji">🏃</div>
    </div>
  );
}

export default ProfileCard;
