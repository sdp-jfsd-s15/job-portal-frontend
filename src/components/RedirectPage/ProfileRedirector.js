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

            const url = `http://localhost:9090/v1/api/users/checkUser/${user.username}`;

            try {
                const response = await API.get(url);

                if (response.status === 200) {
                    navigate(`/professional/profile/${user.username}`);
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate('/create-profile');
                } else {
                    console.error("Error fetching profile:", error);
                }
            }
        };

        fetchProfile();
    }, [navigate, user]);

    return (
        <div>Loading......</div>
    );
};

export default ProfileRedirector;
