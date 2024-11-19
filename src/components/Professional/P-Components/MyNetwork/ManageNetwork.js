import React from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GroupIcon from '@mui/icons-material/Group';
import Divider from '@mui/material/Divider';

const ManageNetwork = () => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <CssBaseline />
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ ml: 2, mb: 2 }}>
                        <b>
                            Manage My Network
                        </b>
                    </Typography>
                    <Divider/>
                    <Button
                        sx={{
                            mt: 2,
                            mr: 5, // Reduce margin between buttons
                            color: "gray",
                            width: "100%",
                            display: 'flex', // Use flexbox layout
                            justifyContent: 'flex-start', // Align content to the left
                            alignItems: 'center', // Align items vertically in the center
                        }}
                        onClick={() => navigate("/professional/my-connections")}
                    >
                        <GroupIcon />
                        <Typography variant="body1" component="div" sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'left' }}> {/* Add margin to the left of the icon */}
                            Connections
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'right' }}> {/* Add margin to the left of the icon */}
                            321
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}

export default ManageNetwork