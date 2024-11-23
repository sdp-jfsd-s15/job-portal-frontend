import React from 'react'
import DrawerAppBar from "./Navigation/ResponsiveNavBar";
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div>
            <DrawerAppBar/>
            <Outlet />
        </div>
    )
}

export default UserDashboard