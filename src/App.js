import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BMIForm from './components/BMIForm';
import ProfileCard from './components/ProfileCard';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import AITrainer from './components/AITrainer';
import Feedback from './components/Feedback';
import Subscription from './components/Subscription';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import LaunchPage from './components/LaunchPage';
import SignUpPage from './components/SignUpPage'; // Import the SignUpPage component
import { UserProvider } from './UserContext';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <Router>
          <Header />
          <div className="main-container">
            <Sidebar />
            <Routes>
              {/* Set the LaunchPage as the default route */}
              <Route path="/" element={<LaunchPage />} /> {/* Default route */}
              <Route path="loginPage" element={<LoginPage />} />
              <Route path="/AITrainer" element={<AITrainer />} />
              <Route path="/BMI" element={<><BMIForm /><ProfileCard /></>} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/subscription" element={<Subscription />} />
	      <Route path="/LaunchPage" element={<LaunchPage />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/signUpPage" element={<SignUpPage />} /> {/* Route for the Sign Up page */}
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
