import React from 'react';
import './ProfileCard.css';
import logo from './images/sniper.png';
function ProfileCard() {
  return (
<div class="profile-card">
  
   <img src = {logo} alt = "User Picture"/>
  <h3>Salman Sniper</h3>
  <p>salman.abid5248@gmail.com</p>
  <p>Birthday: June 8th</p>
  
  <div class="user-info-grid">
    <div class="info-item">
      <p class="info-value">66 Kg</p>
      <p class="info-label">Weight</p>
    </div>
    <div class="info-item">
      <p class="info-value">22</p>
      <p class="info-label">Years Old</p>
    </div>
    <div class="info-item">
      <p class="info-value">181.2 CM</p>
      <p class="info-label">Height</p>
    </div>
  </div>

  <div class="running-emoji">🏃</div>
</div>

  );
}

export default ProfileCard;
