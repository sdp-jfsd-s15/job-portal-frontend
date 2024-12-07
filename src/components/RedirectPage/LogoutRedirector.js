import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const LogoutRedirector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const clientId = '5vghvp9oha7m6kkgkvhjc30f4t'; // Replace with your Cognito App Client ID
      const redirectUri = encodeURIComponent('http://localhost:3000/'); // Replace with your redirect URI
      const domain = 'klefjobportal90053.auth.ap-south-1.amazoncognito.com'; // Replace with your Cognito domain

      // Clear all sessionStorage and localStorage variables
      sessionStorage.clear();
      localStorage.clear();

      // Construct the Cognito sign-out URL with required parameters
      const signOutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;

      // Redirect the user to the Cognito sign-out URL
      window.location.href = signOutUrl;
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default LogoutRedirector;
