import React from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';

const Options = ({ totalDocumentsCount }) => {
    const navigate = useNavigate();
  return (
    <React.Fragment>
            <CssBaseline />
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ ml: 2, mb: 2 }}>
                        <b>
                            Options
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
                        onClick={() => navigate("/professional/post-a-job")}
                    >
                        <AddIcon />
                        <Typography variant="body1" component="div" sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'left' }}> {/* Add margin to the left of the icon */}
                            Post a Job
                        </Typography>
                    </Button>
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
                        onClick={() => navigate("/professional/view-all-my-posted-jobs")}
                    >
                        <InboxIcon />
                        <Typography variant="body1" component="div" sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'left' }}> {/* Add margin to the left of the icon */}
                            View My Posted Jobs
                        </Typography>
                        <Typography variant="body1" component="div" sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'right' }}> {/* Add margin to the left of the icon */}
                            {totalDocumentsCount}
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
        </React.Fragment>
  )
}

export default Options