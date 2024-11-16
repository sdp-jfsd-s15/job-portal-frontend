import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutRedirector = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            const clientId = '5vghvp9oha7m6kkgkvhjc30f4t'; // Replace with your Cognito App Client ID
            const redirectUri = encodeURIComponent('http://localhost:3000'); // Replace with your redirect URI
            const domain = 'klefjobportal90053.auth.ap-south-1.amazoncognito.com'; // Replace with your Cognito domain

            // Corrected URL construction with proper string interpolation
            const signOutUrl = `https://${domain}/logout?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=`;

            // Redirect the user to the Cognito sign-out URL
            window.location.href = signOutUrl;
            navigate('/')
        };

        handleLogout();
    }, [navigate]);

    return <div>Loading.......</div>;
};

export default LogoutRedirector;