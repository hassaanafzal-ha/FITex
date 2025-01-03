import React, { useState } from 'react';
import './Subscription.css'; // External stylesheet
import robot from "./images/robot.png";
import logo from "./images/logo.png";

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscription = () => {
    if (email) {
      setIsSubscribed(true); // Trigger the subscription message
    } else {
      alert("Please enter a valid email.");
    }
  };

  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const handleDonate = () => {
    if (donationAmount && Number(donationAmount) > 0) {
      setDonationMessage(`Thank you for donating $${donationAmount}!`);
      setDonationAmount(''); // Reset donation input
    } else {
      alert("Please enter a valid donation amount.");
    }
  };

  return (
    <div className="subscription-container">
      {/* Main Content */}
      <div className="subscription-content">
        <h1 className="subscription-title">Subscription</h1>
        <div className="subscribe-section">
          <div className="subscribe-text">
            <h2>Subscribe to our fitness tips</h2>
            <p>Clearly communicate the benefits of subscribing, such as exclusive content and breaking news.</p>
            <div className="subscribe-input">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
              />
              <button onClick={handleSubscription}>Subscribe</button>
            </div>
          </div>
          <div className="subscribe-image">
            <img src={robot} alt="Robot" />
          </div>
        </div>
      </div>

      {/* Sidebar Notification */}
      {isSubscribed && (
        <div className="sidebar-notification">
          <p>You will receive daily updates!</p>
        </div>
      )}

      {/* Donate Us Section */}
      <div className="donate-us-section">
        <h2>💝 Donate Us</h2>
        <p>Your support helps us improve and maintain this platform. Any contribution is greatly appreciated!</p>
        <div className="donate-input">
          <input
            type="number"
            placeholder="Enter donation amount ($)"
            value={donationAmount}
            onChange={handleDonationChange}
          />
          <button onClick={handleDonate}>Donate</button>
        </div>
        {donationMessage && <p className="thank-you-message">{donationMessage}</p>}
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Web Application</h3>
            <p>Highlight benefits of each exercise, both physical and mental.</p>
          </div>
          <div>
            <img src={logo} alt="logo" height="200" width="300" />
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
