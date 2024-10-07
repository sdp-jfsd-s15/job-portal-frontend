import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectPage = () => {
    const [content, setContent] = useState("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = AppStore.authToken || sessionStorage.getItem('authToken');
    //             // Construct the URL with parameters
    //             const url = "http://localhost:8080/v1/api/private/content";

    //             // Fetch data from the API using the constructed URL
    //             const response = await axios.get(url, {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
    //                 }
    //             });

    //             //console.log(response.data);
    //             setContent(response.data.message);
    //             // Handle response data here...
    //         } catch (error) {
    //             // Handle errors here...
    //         }
    //     };
    //     fetchData();
    // }, []);
  return (
    <div>
        <h3>Protected Content Says:</h3>
        <div>The server says: {content}</div>
    </div>
  )
}

export default ProtectPage