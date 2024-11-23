import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Options from './Jobs/Options';
import API from '../../Hooks/Api';

const UserJobPage = () => {
    const [documentCount, setDocumentCount] = React.useState(0);

    const handleDocumentCount = (data) => {
        setDocumentCount(data);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh' }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 10, md: 4 }}>
                            <Options totalDocumentsCount={documentCount} />
                        </Grid>
                        <Grid size={{ xs: 8, md: 8, backgroundColor: 'white' }}>
                            {/* <RecentJobsPosted onDataSend={handleDocumentCount}/> */}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default UserJobPage