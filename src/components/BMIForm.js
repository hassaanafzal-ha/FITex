import React, { useState } from 'react';
import './BMIForm.css';

function BMIForm() {
  const [height, setHeight] = useState(165); // Default height in cm
  const [weight, setWeight] = useState(75);  // Default weight in kg

  const calculateBMI = () => {
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    alert(`Your BMI is ${bmi}`);
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
          <button>Male</button>
          <button>Female</button>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        {/* Height Slider */}
        <div className="vertical-slider">
          <div className="slider-value-container">
            <span className="slider-value">{height} cm</span>
            {/* <span className="slider-unit">cm</span> */}
          </div>
        <input
             type="range"
             min="100"
             max="200"
             value={height}
             className="custom-slider-vertical"
             onChange={(e) => setHeight(e.target.value)}
             style={{ transform: 'rotate(90deg)' }} // Rotate the slider for vertical movement
/>
          <p className="slider-label">Set Body Height</p>
          </div>
  

        {/* Weight Slider */}
        <div className="horizontal-slider">
          <div className="slider-value-container">
            <span className="slider-value">{weight} kg</span>
            {/* <span className="slider-unit">kg</span> */}
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={weight}
            className="custom-slider"
            onChange={(e) => setWeight(e.target.value)}
          />
          <p className="slider-label">Set Body Weight</p>
      
        </div>
      </div>

      {/* Calculate BMI Button */}
      <button className="calculate-bmi" onClick={calculateBMI}>
        Calculate BMI
      </button>
    </div>
  );
}

export default BMIForm;
