import React, { useState } from "react";
import "./LoginPage.css";
import fitnessLogo from "./images/fitness-people.png";
import logoIcon from "./images/logo.png";
import statisfiedCustomer from "./images/statisfiedCustomer.jpg";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="loginPage-login-page">
      {/* Left Section */}
      <div className="loginPage-left-section">
        <h1>Helps for your ideal body fitness</h1>
        <p>
          Motivate users with benefits and positive reinforcement, and offer
          modifications and progress tracking.
        </p>
        <form className="loginPage-login-form">
          <div className="input-group">
            <label>Email or Mobile Number</label>
            <input
              type="text"
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
          <button type="submit" className="loginPage-login-button">
            Log In
          </button>
        </form>
      </div>

      {/* Center Image Section */}
      <div className="loginPage-image-section">
        <span className="loginPage-vertical-text">Fitness</span>
        <img
          src={fitnessLogo}
          alt="Fitness Models"
          className="fitness-model"
        />
      </div>

      {/* Right Section */}
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
        <form className="loginPage-register-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your Full Name"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Email or Mobile Number</label>
            <input
              type="text"
              placeholder="example@example.com"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
            />
          </div>
          <div className="button-group">
            <button className="loginPage-register-button">Register</button>
            <button className="loginPage-profile-button">Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
