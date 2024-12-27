import axios from 'axios';

export const API = axios.create({
    baseURL: 'https://jobportalsdpps18-s15-04-90053-31880.up.railway.app', // Your backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials in cross-origin requests if needed
});

API.interceptors.request.use(
    function (config) {
        // Retrieve the idToken from sessionStorage
        const tokenInfo = JSON.parse(sessionStorage.getItem('tokenInfo'));
        const idToken = tokenInfo ? tokenInfo.idToken : null;

        // Add idToken to Authorization header if available
        config.headers = {
            "Authorization": `Bearer ${idToken}`,
        };

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    function(response){
        return response;
    }
    ,
    function(error){
        return Promise.reject(error);
    }
);

export default API;



