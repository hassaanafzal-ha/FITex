import React, { useState } from "react";
import "./Feedback.css";
import reviewer from "./images/reviewer.jpg";
import trophy from "../components/images/trophy.png";
import statisfiedCustomers from "./images/statisfiedCustomers.png";

const Feedback = () => {
  const [question, setQuestion] = useState(""); // State to store the question input
  const [submittedQuestion, setSubmittedQuestion] = useState(null); // State to store the submitted question

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value); // Update question as user types
  };

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      setSubmittedQuestion(question); // Set submitted question to display below
      setQuestion(""); // Clear the input field after submission
    }
  };

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
        </div>
      </div>

      {/* Buttons Below Review */}
      <div className="buttons-section">
        <button>FAQ</button>
        <button>Contact Us</button>
        <button>General</button>
        <button>Account</button>
        <button>Services</button>
        <button
          className="ask-question"
          onClick={handleQuestionSubmit} // Submit question on click
        >
          Ask a Question
        </button>
      </div>

      {/* Input for Asking Question */}
      <div className="ask-question-container">
        <textarea
          value={question}
          onChange={handleQuestionChange} // Update question state on change
          placeholder="Type your question here..."
        />
      </div>

      {/* Display the Submitted Question */}
      {submittedQuestion && (
        <div className="submitted-question">
          <h3>Your Question:</h3>
          <p>{submittedQuestion}</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
