import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import Divider from '@mui/material/Divider';
import API from '../../../../Hooks/Api';

const ManageNetwork = () => {
    const navigate = useNavigate();
    const [connectionCount, setConnectionCount] = useState(0);

    const updateConnectionCount = async () => {
        try {
            const url = "https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/connections/countConnections";
            const response = await API.get(url);
            setConnectionCount(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNavigate = () => {
        const currentPath = window.location.pathname;
        let targetPath = "";

        if (currentPath.startsWith("/professional/my-network")) {
            targetPath = `/professional/my-connections`;
        } else if (currentPath.startsWith("/user/my-network")) {
            targetPath = `/user/my-connections`;
        }

        if (targetPath) {
            navigate(targetPath);
        } else {
            console.error("Invalid path for navigation.");
        }
    };

    useEffect(() => {
        updateConnectionCount();
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ ml: 2, mb: 2 }}>
                        <b>Manage My Network</b>
                    </Typography>
                    <Divider />
                    <Button
                        sx={{
                            mt: 2,
                            mr: 5,
                            color: "gray",
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                        onClick={handleNavigate}
                    >
                        <GroupIcon />
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'left' }}
                        >
                            Connections
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'right' }}
                        >
                            {connectionCount}
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default ManageNetwork;
