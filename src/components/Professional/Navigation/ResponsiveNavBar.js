import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import JobDeklo from "../../../images/JobDekloIcon.png";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import { useAuth } from '../../../Token/AuthContext';

const drawerWidth = 240;

function DrawerAppBar(props) {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [showTitle, setShowTitle] = React.useState(true);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
        setShowTitle((prevState) => !prevState);
    };

    const { user } = useAuth();

    const isActive = (path) => location.pathname === path;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <b>JOB DEKLO</b>
            </Typography>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button 
                    sx={{ padding: 2, color: isActive("/professional/") ? 'black' : 'inherit' }} 
                    onClick={() => navigate("/professional/")}
                >
                    <HomeIcon />
                </Button>
                <Button 
                    sx={{ padding: 2, color: isActive("/about/") ? 'black' : 'inherit' }} 
                    onClick={() => navigate("/about/")}
                >
                    <GroupIcon />
                </Button>
                <Button 
                    sx={{ padding: 2, color: isActive("/contact/") ? 'black' : 'inherit' }} 
                    onClick={() => navigate("/contact/")}
                >
                    <AccountCircleIcon />
                </Button>
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
                        sx={{ mr: 1, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img
                        src={JobDeklo}
                        alt="Logo"
                        style={{ width: '40px', height: '40px', marginLeft: '16px', marginRight: '8px' }} // Adjust margin here if needed
                    />
                    {showTitle && (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}
                        >
                            <b>JOB DEKLO</b>
                        </Typography>
                    )}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <b>JOB DEKLO</b>
                    </Typography>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', width: 300 }} // Align next to the logo
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Users"
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: '150px', alignItems: 'center', ml: 25 }}>
                        <Button
                            sx={{
                                color: isActive("/professional/") ? 'black' : '#073a8c',
                                mr: 3, // Reduce margin between buttons
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                }
                            }}
                            onClick={() => navigate("/professional/")}
                        >
                            <HomeIcon />
                        </Button>
                        <Button
                            sx={{
                                color: isActive("/professional/my-network") ? 'black' : '#073a8c',
                                mr: 3, // Reduce margin between buttons
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                }
                            }}
                            onClick={() => navigate("/professional/my-network")}
                        >
                            <GroupIcon />
                        </Button>
                        <Button
                            sx={{
                                color: isActive("/messages/") ? 'black' : '#073a8c',
                                mr: 3, // Reduce margin between buttons
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                }
                            }}
                            onClick={() => navigate("/messages/")}
                        >
                            <MessageIcon />
                        </Button>
                        <Button
                            sx={{
                                color: isActive("/work/") ? 'black' : '#073a8c',
                                mr: 3, // Reduce margin between buttons
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                }
                            }}
                            onClick={() => navigate("/work/")}
                        >
                            <WorkIcon />
                        </Button>
                        <Button
                            sx={{
                                color: isActive("/contact/") ? 'black' : '#073a8c',
                                mr: 1,
                                '&:hover': {
                                    backgroundColor: '#073a8c',
                                    color: '#fff',
                                },
                            }}
                            onClick={() => navigate(`/professional/profile/${user.username}`)}
                        >
                            <AccountCircleIcon />
                        </Button>
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
                        keepMounted: true,
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
