import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileCompletionForm.css";

const ProfileCompletionForm = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data in localStorage or state management
    localStorage.setItem("profileData", JSON.stringify(profileData));
    // Navigate to BMI Page
    navigate("/bmi");
  };

  return (
    <div className="profile-form-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={profileData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={profileData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            name="height"
            value={profileData.height}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileCompletionForm;
