import React, { createContext, useState, useContext, useEffect } from "react";

// Create the UserContext
const UserContext = createContext();

// Provide the UserContext to children
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if it exists
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }
  }, [user]);

  const logout = () => {
    setUser(null); // Clear user from state
    localStorage.removeItem("userData"); // Remove from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
