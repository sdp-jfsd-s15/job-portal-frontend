import React, { useEffect, useState } from 'react';
import API from '../../../../Hooks/Api';
// eslint-disable-next-line
import { Card, CardContent, Typography, Avatar, Button, IconButton, Menu, MenuItem, Box, Grid, Divider, Select, MenuItem as DropdownItem } from '@mui/material';
import { MoreVert, Delete } from '@mui/icons-material';
import { Container, CssBaseline } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const MyConnections = () => {
    const navigate = useNavigate();
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [filterOption, setFilterOption] = useState("recentlyAdded");
    const [connectionCount, setConnectionCount] = useState(0);
    const { userName } = useParams();

    const handleMenuOpen = (event, userName) => {
        setAnchorEl(event.currentTarget);
        setCurrentUser(userName);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentUser(null);
    };

    const handleRemoveConnection = async (userName) => {
        try {
            // const status = "REJECTED";
            const url = "Dont request to the url until you change the logic for backend";
            // const url = `/v1/api/connections/updateConnection/${userName}/${status}`;
            console.log("API URL:", url);

            const response = await API.put(url);
            console.log("API Response:", response);

            if (response.status === 200) {
                console.log("Connection removed successfully");
                updateConnectionCount();
                window.location.reload();
            } else {
                console.error("Failed to remove connection:", response);
            }
        } catch (err) {
            console.error("Error in handleRemoveConnection:", err);
        }

        handleMenuClose();
    };


    const handleFilterChange = (event) => {
        const selectedOption = event.target.value;
        setFilterOption(selectedOption);
        let sortedConnections = [...connections];

        switch (selectedOption) {
            case "recentlyAdded":
                sortedConnections.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
                break;
            case "firstName":
                sortedConnections.sort((a, b) => a.firstName.localeCompare(b.firstName));
                break;
            case "lastName":
                sortedConnections.sort((a, b) => a.lastName.localeCompare(b.lastName));
                break;
            default:
                break;
        }
        setFilteredConnections(sortedConnections);
    };


    const updateConnectionCount = async () => {
        try {
            const url = "/v1/api/connections/countConnections";
            const response = await API.get(url);
            setConnectionCount(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        updateConnectionCount();
    }, []);

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                let url = `/v1/api/connections/get`; // Default API call

                // Check if username is present and modify the API call if needed
                if (userName) {
                    console.log("entered in username")
                    url = `/v1/api/connections/get/${userName}`;
                    const response = await API.get(url);
                    const connectionData = response.data.connections || [];
                    setConnections(connectionData);
                    setFilteredConnections(connectionData);
                    return;// API for specific user
                }

                // Make the API call based on the determined URL
                const response = await API.get(url);
                const connectionData = response.data.connections || [];
                setConnections(connectionData);
                setFilteredConnections(connectionData); // Initialize with the original order
            } catch (err) {
                console.error(err);
            }
        };

        fetchConnections();
    }, [userName]);

    const handleMessage = async (user) => {
        const currentPath = window.location.pathname;
        let targetPath = "";

        if (currentPath.startsWith("/professional/my-connections") || currentPath.startsWith(`/professional/connection-details/`)) {
            targetPath = `/professional/messages/${user.userName}/${user.firstName}/${user.lastName}`;
        } else if (currentPath.startsWith("/user/my-connections") || currentPath.startsWith(`/user/connection-details/`)) {
            targetPath = `/user/messages/${user.userName}/${user.firstName}/${user.lastName}`;
        }

        if (targetPath) {
            await navigate(targetPath);
        } else {
            console.error("Invalid path for navigation.");
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: "100vh", backgroundColor: "white", padding: 4 }}>
                    <Box>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                            <Grid item>
                                <Typography variant="h6">
                                    {connectionCount} Connections
                                </Typography>
                            </Grid>
                            <Grid item>
                                Sort By: <Select
                                    value={filterOption}
                                    onChange={handleFilterChange}
                                    displayEmpty
                                    sx={{
                                        minWidth: 100,
                                        borderRadius: "20px",
                                        backgroundColor: "white",
                                        border: "1px solid #ccc",
                                        minHeight: 10
                                    }}
                                >
                                    <MenuItem value="recentlyAdded">Recently Added</MenuItem>
                                    <MenuItem value="firstName">First Name</MenuItem>
                                    <MenuItem value="lastName">Last Name</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginTop: 2, color: 'black' }} />
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        {filteredConnections.map((connection) => (
                            <Card
                                key={connection.userName}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    marginBottom: 4,
                                    maxHeight: 60
                                }}
                            >
                                <Avatar style={{ marginRight: '1rem' }}>
                                    {connection.firstName[0]}
                                </Avatar>
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography variant="h6">
                                        {connection.firstName} {connection.lastName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        @{connection.userName}
                                    </Typography>
                                </CardContent>
                                <Button
                                    variant="outlined"
                                    style={{
                                        marginRight: '1rem',
                                        borderRadius: '20px',
                                        textTransform: 'none',
                                    }}
                                    onClick={() => handleMessage(connection)}
                                >
                                    Message
                                </Button>
                                <IconButton
                                    onClick={(event) => handleMenuOpen(event, connection.userName)}
                                >
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && currentUser === connection.userName}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => handleRemoveConnection(connection.userName)}>
                                        <Delete style={{ marginRight: '0.5rem' }} />
                                        Remove
                                    </MenuItem>
                                </Menu>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default MyConnections;
