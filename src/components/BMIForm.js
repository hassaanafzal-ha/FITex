import React, { useState, useEffect } from "react";
import "./BMIForm.css";
import axios from "axios";

function BMIForm() {
  const [height, setHeight] = useState(165); // Default height in cm
  const [weight, setWeight] = useState(75); // Default weight in kg
  const [gender, setGender] = useState(""); // Gender selection
  const [bmi, setBmi] = useState(null); // BMI state to store the calculated BMI
  const [age, setAge] = useState(22); // User's age, default 22
  const [userEmail, setUserEmail] = useState(null); // To store the logged-in user's email

  // Check for logged-in user's email from localStorage
  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    } else {
      console.log("No user email found in localStorage.");
    }
  }, []);

  const calculateBMI = () => {
    const calculatedBmi = parseFloat(
      (weight / ((height / 100) ** 2)).toFixed(2)
    );
    setBmi(calculatedBmi); // Set the calculated BMI to the state
  };

const handleSaveUserInfo = () => {
  if (userEmail && bmi !== null && height && weight && age) {
    // Prepare data with proper type conversion
    const payload = {
      userId: userEmail,
      height: Number(height), // Ensure height is a number
      weight: Number(weight), // Ensure weight is a number
      age: Number(age),       // Ensure age is a number
      bmi: Number(bmi),       // Ensure BMI is a number
    };

    console.log("Payload being sent:", payload);

    axios
      .post("http://localhost:5000/api/user-info", payload)
      .then((response) => {
        console.log("User info saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving user info:", error);
      });
  } else {
    console.log("Missing required data");
  }
};


  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obesity";
    }
  };

  return (
    <div className="bmi-form-container">
      <div className="background-text">Body-Mass Input</div>

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

        {/* Age Input */}
        <div className="age-input">
          <label htmlFor="age">Enter your Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            min="0"
            max="120"
            placeholder="Enter your age"
          />
        </div>
      </div>

      <div className="right-section">
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
            onChange={(e) => setHeight(Number(e.target.value))}
            style={{ transform: "rotate(90deg)" }}
          />
          <p className="slider-label">Set Body Height</p>
        </div>

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
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <p className="slider-label">Set Body Weight</p>
        </div>
      </div>

      <button
        className="calculate-bmi"
        onClick={calculateBMI}
        disabled={!gender}
        style={{
          opacity: gender ? 1 : 0.5,
          cursor: gender ? "pointer" : "not-allowed",
        }}
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className="bmi-message-box">
          <p>Your BMI is: {bmi}</p>
          <p>Category: {getBmiCategory(bmi)}</p>
        </div>
      )}

      <button
        className="save-info"
        onClick={handleSaveUserInfo}
        disabled={!bmi}
      >
        Save Information
      </button>
    </div>
  );
}

export default BMIForm;
