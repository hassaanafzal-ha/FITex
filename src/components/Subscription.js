import React from 'react';
import './Subscription.css'; // External stylesheet
import robot from "./images/robot.png";
import logo from "./images/logo.png"
const Subscription = () => {
  return (
    <div className="subscription-container">
 
      {/* Main Content */}
      <div className="subscription-content">
        <h1 className="subscription-title">Subscription</h1>
        <div className="subscribe-section">
          <div className="subscribe-text">
            <h2>Subscribe our fitness tips</h2>
            <p>Clearly communicate the benefits of subscribing, such as exclusive content and breaking news.</p>
            <div className="subscribe-input">
              <input type="email" placeholder="Enter your email address" />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="subscribe-image">
            <img src= {robot} alt="Robot" />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Web Application</h3>
            <p>Highlight benefits of each exercise, both physical and mental.</p>
          </div>
          <div>
            <img src= {logo} alt= "logo" height = "200" width = "300"/>
          </div>
          <div className="footer-column">
  <h3>Sitemap</h3>
  <ul>
    <li><a href="#about-us">About Us</a></li>
    <li><a href="#promos">Promos</a></li>
    <li><a href="#news-blog">News & Blog</a></li>
    <li><a href="#help-center">Help Center</a></li>
  </ul>
</div>
<div className="footer-column">
  <h3>Support</h3>
  <ul>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#support-center">Support Center</a></li>
  </ul>
</div>
<div className="footer-column">
  <h3>Social Media</h3>
  <ul className="social-icons">
    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
  </ul>
</div>

        </div>
       
      </footer>
    </div>
  );
};

export default Subscription;
