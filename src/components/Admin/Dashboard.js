import React from 'react'
import DrawerAppBar from "./Navigation/ResponsiveNavBar";
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <DrawerAppBar/>
            <Outlet />
        </div>
    )
}

export default Dashboard