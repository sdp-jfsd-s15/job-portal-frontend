import axios from 'axios';

export const API = axios.create();

API.interceptors.request.use(
    function (config) {
        // Retrieve the idToken from sessionStorage
        const tokenInfo = JSON.parse(sessionStorage.getItem('tokenInfo'));
        const idToken = tokenInfo ? tokenInfo.idToken : null;

        // Add idToken to Authorization header if available
        if (idToken) {
            config.headers = {
                ...config.headers,
                "Authorization": `Bearer ${idToken}`,
            };
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default API;
