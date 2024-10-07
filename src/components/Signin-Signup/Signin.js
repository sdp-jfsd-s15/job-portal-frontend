import { useEffect } from 'react';
import { useAuth } from '../../Token/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const cognitoUrl = "https://klefjobportal90053.auth.ap-south-1.amazoncognito.com/oauth2/authorize?client_id=5vghvp9oha7m6kkgkvhjc30f4t&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-redirect";

  const { login } = useAuth(); // Use `login` function from AuthContext

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const urlParams = new URLSearchParams(hash.substring(1)); // Remove the `#` from the hash
      const idToken = urlParams.get('id_token');
      const accessToken = urlParams.get('access_token');
      const expiresIn = urlParams.get('expires_in');

      // Store the tokens in context
      if (idToken && accessToken) {
        login({ idToken, accessToken, expiresIn });
        navigate("/");
      }

      // Optional: Clear the hash from the URL after extraction
      //window.history.replaceState(null, null, window.location.pathname);
    } else {
      // If no token is found in the URL hash, redirect to Cognito login page
      window.location.href = cognitoUrl;
    }
  }, [login, navigate, cognitoUrl]);

  return null; // No UI elements, as this component only handles redirection
}

export default Signin;
