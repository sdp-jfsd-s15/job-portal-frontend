import React, { useEffect } from 'react'
import DrawerAppBar from "../Navigation/ResponsiveNavBar";

const Welcome = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct the URL with parameters
                //console.log(response.data);
                // Handle response data here...
            } catch (error) {
                // Handle errors here...
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <DrawerAppBar/>
        </div>
    )
}

export default Welcome