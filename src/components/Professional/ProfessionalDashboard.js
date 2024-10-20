import React from 'react'
import DrawerAppBar from "./Navigation/ResponsiveNavBar";
import { Outlet } from 'react-router-dom';

const ProfessionalDashboard = () => {
    return (
        <div>
            <DrawerAppBar/>
            <Outlet />
        </div>
    )
}

export default ProfessionalDashboard