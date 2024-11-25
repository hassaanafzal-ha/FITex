import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
        <li><NavLink to="/launchPage">Launch Page</NavLink></li>
          <li><NavLink to="/loginPage">Login Page</NavLink></li>
          <li><NavLink to="/homePage" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink></li>
          <li><NavLink to="/BMI" className={({ isActive }) => (isActive ? 'active-link' : '')}>BMI</NavLink></li>
          <li><NavLink to="/AITrainer" className={({ isActive }) => (isActive ? 'active-link' : '')}>Ai Trainer</NavLink></li>
          <li><NavLink to="/feedback" className={({ isActive }) => (isActive ? 'active-link' : '')}>Feedback</NavLink></li>
          <li><NavLink to="/subscription" className={({ isActive }) => (isActive ? 'active-link' : '')}>Subscription</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
