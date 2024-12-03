import React, { useState } from "react";
import "./LoginPage.css";
import fitnessLogo from "./images/fitness-people.png";
import logoIcon from "./images/logo.png";
import statisfiedCustomer from "./images/statisfiedCustomer.jpg";
import axios from "axios";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [logerrorMessage, setLogerrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const { setUser } = useUser(); 
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGetUser = async (e) => {
    e.preventDefault();
    if (!email) {
      setLogerrorMessage("Please enter an email.");
      return;
    }

    try {
      // Fetch all users
      const response = await axios.get(
        "https://fitex-c1fe3-default-rtdb.asia-southeast1.firebasedatabase.app/user.json"
      );
      const data = response.data;

      // Search for the specific user by email
      const user = Object.values(data).find((user) => user.email === email);

      if (user && user.password === password) {
        setUser(user); // Set the user data in the context
        setLogerrorMessage("");
        navigate("/homePage"); // Redirect to HomePage after successful login
      } else {
        setLogerrorMessage("User not found or incorrect password.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Validate confirmPassword
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      // Send data to Firebase
      const response = await axios.post(
        "https://fitex-c1fe3-default-rtdb.asia-southeast1.firebasedatabase.app/user.json",
        { name, email, password }
      );
      
      // After successful registration, store user and navigate to HomePage
      const newUser = { name, email, password };
      setUser(newUser);  // Set the new user to context
      setSuccessMessage("Registration successful!");
      setErrorMessage("");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" }); // Reset form
      navigate("/homePage"); // Redirect to HomePage after successful registration
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error(error);
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
        <form className="loginPage-login-form">
          <div className="input-group">
            <label>Email or Mobile Number</label>
            <input
              type="text"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
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
                onChange={(e)=>{setPassword(e.target.value)}}
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
          <button type="submit" onClick={handleGetUser} className="loginPage-login-button">
            Log In
          </button>
        </form>
      </div>

      {/* Center Image Section */}
      <div className="loginPage-image-section">
        <span className="loginPage-vertical-text">Fitness</span>
        <img src={fitnessLogo} alt="Fitness Models" className="fitness-model" />
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
        <form className="loginPage-register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label>Email or Mobile Number</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@example.com"
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="input-field"
              required
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <div className="button-group">
            <button type="submit" className="loginPage-register-button">
              Register
            </button>
            <button type="button" className="loginPage-profile-button">
              Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
