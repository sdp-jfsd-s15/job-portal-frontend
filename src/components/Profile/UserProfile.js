import React from 'react';
import { useAuth } from '../../Token/AuthContext'; // Import the custom hook

const UserProfile = () => {
  const { user } = useAuth(); // Destructure the user from the AuthContext

  if (!user) {
    console.log(user);
    return <div>Loading...</div>; // Handle case when user is not available (e.g., user is not logged in)
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>{user.email}</p>
      {/* Add more user information if available */}
    </div>
  );
};

export default UserProfile;
