import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Corrected import

export const AuthContext = createContext({
  user: null,
  tokenInfo: null, // Will hold id_token, access_token, and expires_in
  login: (tokenData) => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  // Retrieve user and token information from sessionStorage if available
  const [user, setUser] = useState(
    sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
  );
  const [tokenInfo, setTokenInfo] = useState(
    sessionStorage.getItem('tokenInfo') ? JSON.parse(sessionStorage.getItem('tokenInfo')) : null
  );

  // Function to handle user login
  const login = ({ idToken, accessToken, expiresIn }) => {
    try {
      // Decode the JWT token to get user information
      const decodedToken = jwtDecode(idToken);
      const userData = {
        email: decodedToken.email,
        username: decodedToken['cognito:username'], // Adjust key as per your token structure
        role: decodedToken['role'] || '', // If role is available in the token
      };

      const tokenData = {
        idToken,
        accessToken,
        expiresIn,
      };

      // Save user and token information to sessionStorage
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('tokenInfo', JSON.stringify(tokenData));

      // Set state with user and token data
      setUser(userData);
      setTokenInfo(tokenData);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('tokenInfo');
    setUser(null);
    setTokenInfo(null);
  };

  return (
    <AuthContext.Provider value={{ user, tokenInfo, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
