import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import JobDeklo from "../../../images/JobDekloIcon.png";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [showTitle, setShowTitle] = React.useState(true); // State to control title visibility


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
        setShowTitle((prevState) => !prevState); // Toggle title visibility when drawer opens
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <b>
                    JOB DEKLO
                </b>
            </Typography>
            <Divider />
            {/* Individual buttons without using navItems array */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button sx={{ padding: 2 }} onClick={() => navigate("admin/")}>Home</Button>
                <Button sx={{ padding: 2 }}>About</Button>
                <Button sx={{ padding: 2 }}>Contact</Button>
            </Box>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: '#d4e3fa', color: '#000' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        src={JobDeklo} // Replace with your image path
                        alt="Logo"
                        style={{ width: '40px', height: '40px', marginLeft: '150px', marginRight: '8px' }} // Adjust size and margin as needed
                    />
                    {showTitle && ( // Only show title based on state
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }} // Show on mobile
                        >
                            <b>
                                JOB DEKLO
                            </b>
                        </Typography>
                    )}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} // Show on larger screens
                    >
                        <b>
                            JOB DEKLO
                        </b>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: '150px', alignItems: 'center' }}>
                        <Button
                            sx={{
                                color: '#073a8c',
                                mr: 7,
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                },
                            }}
                            onClick={() => navigate("/admin/check-users")}
                        >
                            <b>Users</b>
                        </Button>
                        {/* About Button and Hover Box */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: '150px', alignItems: 'center' }}>
                            <Button
                                sx={{
                                    color: '#073a8c',
                                    '&:hover': {
                                        backgroundColor: '#073a8c',
                                        color: '#fff',
                                    },
                                }}
                                onClick={() => navigate("/admin/jobs")}
                            >
                                <b>Jobs</b>
                            </Button>
                        </Box>
                        <Button
                            sx={{
                                mr: 1,
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                },
                            }}
                            onClick={() => navigate('/logout')}
                        >
                            <ExitToAppIcon />
                        </Button>
                        {/* Contact Button and Hover Box */}
                        {/* <Box
                            onMouseEnter={handleContactMenuOpen}
                            onMouseLeave={handleContactMenuClose}
                            sx={{ position: 'relative' }}
                        >
                            <Button
                                sx={{
                                    color: '#073a8c',
                                    '&:hover': {
                                        backgroundColor: '#073a8c',
                                        color: '#fff',
                                    },
                                }}
                            >
                                <b>Contact</b>
                            </Button>
                            <Contact
                                contactAnchorEl={contactAnchorEl}
                                handleContactMenuClose={handleContactMenuClose}
                            />
                        </Box> */}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

DrawerAppBar.propTypes = {
    window: PropTypes.func,
};

export default DrawerAppBar;
