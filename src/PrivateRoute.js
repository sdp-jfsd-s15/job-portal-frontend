import React from 'react';
import { Navigate } from 'react-router-dom';// Assuming you already have this context
import { useAuth } from './Token/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { tokenInfo } = useAuth(); // Retrieve token info from context
  
  // If tokens are not available, navigate to the login page or logout
  if (!tokenInfo || !tokenInfo.idToken || !tokenInfo.accessToken) {
    return <Navigate to="/logout" replace />;
  }

  return element;
};

export default PrivateRoute;
