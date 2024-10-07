import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Token/AuthContext"; // Adjust the path accordingly

const AuthRedirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get("id_token");
      const accessToken = params.get("access_token");
      const expiresIn = params.get("expires_in");

      if (idToken && accessToken) {
        // Call login function to store user and token information
        login({ idToken, accessToken, expiresIn });

        navigate("/profile"); 
      }
    }
  }, [login, navigate]);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
};

export default AuthRedirect;
