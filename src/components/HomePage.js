import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import homePic from "./images/homePic.png";

const translations = {
  en: {
    welcome: "Welcome,",
    todaysDate: "Today's Date:",
    dailyTip: "💡 Daily Fitness Tip",
    cards: [
      { title: "Cardio Strength", text: "Boost your heart health and stamina with focused cardio exercises." },
      { title: "Fat Loss", text: "Accelerate fat burning with tailored workout and nutrition plans." },
      { title: "Muscle Gain", text: "Build muscle strength with effective training and proper guidance." },
      { title: "Nutritions", text: "Optimize your diet with personalized nutrition and meal planning." },
    ],
    profileMessage:
      "Enhance your fitness journey with healthy tips, support resources, and social engagement. Update your profile to unlock personalized experiences!",
    profileButton: "Complete Your Profile",
  },
  es: {
    welcome: "Bienvenido,",
    todaysDate: "Fecha de hoy:",
    dailyTip: "💡 Consejo diario de fitness",
    cards: [
      { title: "Fuerza Cardio", text: "Mejora tu salud cardíaca y resistencia con ejercicios de cardio enfocados." },
      { title: "Pérdida de Grasa", text: "Acelera la quema de grasa con planes de entrenamiento y nutrición personalizados." },
      { title: "Ganancia Muscular", text: "Construye fuerza muscular con entrenamiento efectivo y orientación adecuada." },
      { title: "Nutrición", text: "Optimiza tu dieta con planificación de comidas personalizada." },
    ],
    profileMessage:
      "Mejora tu viaje de fitness con consejos saludables, recursos de apoyo y compromiso social. ¡Actualiza tu perfil para desbloquear experiencias personalizadas!",
    profileButton: "Completa tu Perfil",
  },
  fr: {
    welcome: "Bienvenue,",
    todaysDate: "Date d'aujourd'hui:",
    dailyTip: "💡 Conseil quotidien sur le fitness",
    cards: [
      { title: "Force Cardio", text: "Améliorez votre santé cardiaque et votre endurance avec des exercices de cardio ciblés." },
      { title: "Perte de Graisse", text: "Accélérez la combustion des graisses avec des plans d'entraînement et de nutrition personnalisés." },
      { title: "Gain Musculaire", text: "Développez votre force musculaire grâce à un entraînement efficace et des conseils appropriés." },
      { title: "Nutrition", text: "Optimisez votre alimentation grâce à une planification des repas personnalisée." },
    ],
    profileMessage:
      "Améliorez votre parcours de fitness avec des conseils sains, des ressources de soutien et un engagement social. Mettez à jour votre profil pour débloquer des expériences personnalisées !",
    profileButton: "Complétez votre Profil",
  },
};

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [dailyTip, setDailyTip] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const t = translations[language];

  useEffect(() => {
    // Retrieve username and email from localStorage
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    setUserName(name || "Guest");
    setUserEmail(email || "");

    // Array of fitness tips
    const tips = [
      "Stay hydrated – drink at least 8 glasses of water daily.",
      "Consistency is the key to fitness success.",
      "Stretch before and after your workouts to prevent injury.",
      "Eat a balanced diet with plenty of vegetables and lean protein.",
      "Take rest days to allow your muscles to recover and grow.",
      "Aim for at least 30 minutes of exercise daily.",
      "Set realistic fitness goals and track your progress.",
      "A good night's sleep is as important as a good workout.",
      "Don't skip warm-ups – prepare your body for intense activity.",
      "Find a workout you enjoy to stay motivated.",
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setDailyTip(randomTip);

    const today = new Date();
    setCurrentDate(today.toLocaleDateString());
  }, []);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="homepage-container">
      {/* Transparent Header */}
      <div className="transparent-header">
        <h1>{t.welcome} {userName}</h1>
      </div>

      {/* Language Selector */}
      <div className="language-selector">
        <label htmlFor="language">Select Language: </label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="current-date">
          <h3>{t.todaysDate} {currentDate}</h3>
        </div>

        <div className="daily-tip">
          <h2>{t.dailyTip}</h2>
          <p>{dailyTip}</p>
        </div>

        <div className="cards-section">
          {t.cards.map((card, index) => (
            <div
              className={`card ${index === 1 ? "active" : ""}`}
              key={index}
              onClick={() => navigate("/BMI")}
            >
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="profile-completion-section">
          <p>{t.profileMessage}</p>
          <button className="profile-button" onClick={() => navigate("/BMI")}>
            {t.profileButton}
          </button>
        </div>

        <div className="motivational-image">
          <img src={homePic} alt="Motivational Character" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
