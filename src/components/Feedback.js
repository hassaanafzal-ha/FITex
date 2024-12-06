import React, { useState } from "react";
import "./Feedback.css";
import reviewer from "./images/reviewer.jpg";
import trophy from "../components/images/trophy.png";
import satisfiedCustomers from "./images/statisfiedCustomers.png";

const Feedback = () => {
  const [question, setQuestion] = useState(""); // State to store the question input
  const [submittedQuestion, setSubmittedQuestion] = useState(null); // State to store the submitted question
  const [showContactInfo, setShowContactInfo] = useState(false); // State to toggle contact info
  const [showFAQ, setShowFAQ] = useState(false); // State to toggle FAQ modal visibility

  // List of FAQ questions
  const faqQuestions = [
    "How can I improve my fitness?",
    "What is the best diet for weight loss?",
    "How often should I exercise?",
    "What are the benefits of strength training?",
    "Can I lose weight by just walking?",
    "How do I stay motivated to work out?",
    "What should I eat before and after a workout?",
    "How do I track my progress effectively?"
  ];

  // Toggle FAQ section visibility
  const handleFAQClick = () => {
    setShowFAQ(!showFAQ); // Toggle the FAQ visibility
  };

  // Handle question input
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value); // Update question as user types
  };

  // Submit question
  const handleQuestionSubmit = () => {
    if (question.trim()) {
      setSubmittedQuestion(question); // Set submitted question to display below
      setQuestion(""); // Clear the input field after submission
    }
  };

  // Handle contact info modal
  const handleContactClick = () => {
    setShowContactInfo(true); // Show the contact information modal
  };

  const closeContactInfo = () => {
    setShowContactInfo(false); // Close the contact information modal
  };

  // Close FAQ modal
  const closeFAQModal = () => {
    setShowFAQ(false); // Close the FAQ modal
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
            <img src={satisfiedCustomers} alt="Satisfied Customer" />
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
        <button onClick={handleFAQClick}>FAQ</button>
        <button onClick={handleContactClick}>Contact Us</button>
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
          <h3>Your Question will be answered shortly :</h3>
          <p>{submittedQuestion}</p>
        </div>
      )}

      {/* Modal for Contact Information */}
      {showContactInfo && (
        <div className="contact-modal">
          <div className="modal-content">
            <h2> Developers Info </h2>
            <p>Email: Ubadahme@gmail.com</p>
            <p>Phone: +92-3302255220</p>
            <button 
              className="close-modal"
              onClick={closeContactInfo} >
              OK
            </button>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="faq-modal">
          <div className="modal-content">
            <h2>Frequently Asked Questions</h2>
            <ul>
              {faqQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
            <button className="close-modal" onClick={closeFAQModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
