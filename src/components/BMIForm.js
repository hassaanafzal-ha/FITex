import React, { useState } from "react";
import "./BMIForm.css";

function BMIForm() {
  const [height, setHeight] = useState(165); // Default height in cm
  const [weight, setWeight] = useState(75); // Default weight in kg
  const [gender, setGender] = useState(""); // Gender selection
  const [bmi, setBmi] = useState(null); // BMI state to store the calculated BMI

  const calculateBMI = () => {
    const calculatedBmi = (weight / ((height / 100) ** 2)).toFixed(2);
    setBmi(calculatedBmi); // Set the calculated BMI to the state
  };

  return (
    <div className="bmi-form-container">
      {/* Background text */}
      <div className="background-text">Body-Mass Input</div>

      {/* Left Section */}
      <div className="left-section">
        <h1>Body Mass Index</h1>
        <p>Set Your Inputs</p>
        <div className="gender-buttons">
          <button
            className={gender === "Male" ? "active" : ""}
            onClick={() => setGender("Male")}
          >
            Male
          </button>
          <button
            className={gender === "Female" ? "active" : ""}
            onClick={() => setGender("Female")}
          >
            Female
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Height Slider */}
        <div className="vertical-slider">
          <div className="slider-value-container">
            <span className="slider-value">{height} cm</span>
          </div>
          <input
            type="range"
            min="100"
            max="200"
            value={height}
            className="custom-slider-vertical"
            onChange={(e) => setHeight(e.target.value)}
            style={{ transform: "rotate(90deg)" }}
          />
          <p className="slider-label">Set Body Height</p>
        </div>

        {/* Weight Slider */}
        <div className="horizontal-slider">
          <div className="slider-value-container">
            <span className="slider-value">{weight} kg</span>
          </div>
          <input
            type="range"
            min="30"
            max="200"
            value={weight}
            className="custom-slider"
            onChange={(e) => setWeight(e.target.value)}
          />
          <p className="slider-label">Set Body Weight</p>
        </div>
      </div>

      {/* Calculate BMI Button */}
      <button
        className="calculate-bmi"
        onClick={calculateBMI}
        disabled={!gender} // Disable button if no gender is selected
        style={{ opacity: gender ? 1 : 0.5, cursor: gender ? "pointer" : "not-allowed" }}
      >
        Calculate BMI
      </button>

      {/* BMI Message Box */}
      {bmi && (
        <div className="bmi-message-box">
          <p>Your BMI is: {bmi}</p>
        </div>
      )}
    </div>
  );
}

export default BMIForm;
