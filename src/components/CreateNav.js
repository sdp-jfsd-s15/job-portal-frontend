import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import JobDeklo from "../images/JobDekloIcon.png"


function DrawerAppBar(props) {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: '#d4e3fa', color: '#000' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        src={JobDeklo} // Replace with your image path
                        alt="Logo"
                        style={{ width: '40px', height: '40px', marginLeft: '150px', marginRight: '8px' }} // Adjust size and margin as needed
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }} // Show on all screen sizes
                    >
                        <b>
                            JOB DEKLO
                        </b>
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <PageInfo />
            </Box> */}
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
