import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Token/AuthContext';
import API from '../../Hooks/Api';

const ProfileRedirector = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user || !user.username) {
                console.error("Username is undefined.");
                return;
            }

            const url = `/v1/api/users/checkUser/${user.username}`;
            console.log("Requesting URL:", url);

            try {
                const response = await API.get(url);

                if (response.status === 200) {
                    navigate(`/professional/profile/${user.username}`);
                } 
                else if (response.status === 404) {
                    navigate('/create-profile');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate('/create-profile'); // Redirect to profile creation if there's an error
            }
        };
        
        fetchProfile();
    }, [navigate, user]);

    return (
        <div>Loading......</div>
    );
};

export default ProfileRedirector;
