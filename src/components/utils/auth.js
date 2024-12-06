import jwt_decode from 'jwt-decode';

// Get user info from JWT token
export const getLoggedInUser = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const decoded = jwt_decode(token);  // Decode the token
      return decoded;  // Return the decoded user data
    } catch (error) {
      console.error('Invalid token', error);
      return null;  // Return null if the token is invalid
    }
  }
  return null;  // Return null if no token found
};

// Check if the user is logged in by validating the token
export const isUserLoggedIn = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      jwt_decode(token);  // Try decoding the token to validate it
      return true;
    } catch (error) {
      return false;  // Return false if the token is invalid
    }
  }
  return false;  // Return false if no token found
};
