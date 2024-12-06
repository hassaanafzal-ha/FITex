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
  const [showGeneralInfo, setShowGeneralInfo] = useState(false); // State to toggle general info modal visibility
  const [showServices, setShowServices] = useState(false); // State to toggle services modal visibility

  // List of FAQ questions
  const faqQuestions = [
    "How can I improve my website design?",
    "How often should I code?",
    "What are the benefits of MERN?",
    "Who is the real team lead?",
    "Can I lose weight by just coding?",
    "How do I stay motivated by not doing anything?",
    "What should I eat before and after a workout?",
    "Is it true that bajwa and butt are ditto same?",
    "Why Bajwa is all talk and no work?",
  ];

  // Toggle FAQ section visibility
  const handleFAQClick = () => {
    setShowFAQ(!showFAQ); // Toggle the FAQ visibility
  };

  // Toggle General Info section visibility
  const handleGeneralClick = () => {
    setShowGeneralInfo(!showGeneralInfo); // Toggle general info visibility
  };

  // Toggle Services section visibility
  const handleServicesClick = () => {
    console.log("Services button clicked"); // Debugging line
    setShowServices(!showServices); // Toggle services modal visibility
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

  const closeGeneralInfo = () => {
    setShowGeneralInfo(false); // Close the general info modal
  };

  const closeServicesModal = () => {
    setShowServices(false); // Close the services modal
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
        <button onClick={handleGeneralClick}>General</button>
        <button onClick={handleServicesClick}>Services</button>
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

      {/* General Info Modal */}
      {showGeneralInfo && (
        <div className="general-info-modal">
          <div className="modal-content">
            <h2>General Information</h2>
            <p>
              Welcome to our fitness app! We provide personalized workout
              plans, nutrition tracking, and progress monitoring to help you
              achieve your fitness goals.
            </p>
            <p>
              Our mission is to empower individuals to live healthier, more
              active lives. We believe in offering support and guidance to help
              you stay motivated and on track.
            </p>
            <p>
              For more information about our services, feel free to check out
              the FAQ section or reach out to us through the contact page.
            </p>
            <button className="close-modal" onClick={closeGeneralInfo}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Services Modal */}
      {showServices && (
        <div className="services-modal">
          <div className="modal-content">
            <h2>Our Services</h2>
            <ul>
              <li>Personalized Workout Plans</li>
              <li>Nutrition Tracking</li>
              <li>Progress Monitoring</li>
              <li>Weekly Check-ins with Coaches</li>
              <li>Motivational Support</li>
              <li>24/7 Online Support</li>
              <li>Customized Meal Plans</li>
            </ul>
            <button className="close-modal" onClick={closeServicesModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
