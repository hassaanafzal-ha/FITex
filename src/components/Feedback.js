import React from "react";
import "./Feedback.css";
import reviewer from "./images/reviewer.jpg";
import trophy from "../components/images/trophy.png";
import statisfiedCustomers from "./images/statisfiedCustomers.png";
const Feedback = () => {
  return (
    <div className="feedback-container">
      {/* Feedback Heading */}
      <div className="feedback-header">
        <h1>FEEDBACK</h1>
      </div>

      {/* Review Section Container */}
      <div className="review-section-container">
        {/* Left Block */}
        <div className="review-section-text">
          <h2>What Our Member Say About Us?</h2>
          <div className="satisfied-customer">
            <span>10K+ Satisfied Customers</span>
            <img src={statisfiedCustomers} alt="Satisfied Customer" />
          </div>
        </div>

        {/* Middle Block: Review */}
        <div className="review-section">
          <div className="stars-container">
            <span>⭐⭐⭐⭐⭐</span>
          </div>
          <p>
            “Join this fitness member, the best choice that I’ve. They’re very
            professional and give you suggestions about what food and nutrition
            that you can eat.”
          </p>
          <div className="reviewer-info">
            <img src={reviewer} alt="Reviewer" />
            <div className="reviewer-details">
              <h4>Ubaid Ahmed</h4>
              <span>Office Worker</span>
            </div>
          </div>
        </div>

        {/* Right Block: Trophy Section */}
        <div className="congrats-section">
          <img src={trophy} alt="Trophy" height="500" width="500" />
          {/* <h4>Congrats!!!</h4>
          <span>You complete your target</span> */}
        </div>
      </div>

      {/* Buttons Below Review */}
      <div className="buttons-section">
        <button>FAQ</button>
        <button>Contact Us</button>
        <button>General</button>
        <button>Account</button>
        <button>Services</button>
        <button className="ask-question">Ask a Question</button>
      </div>
    </div>
  );
};

export default Feedback;
