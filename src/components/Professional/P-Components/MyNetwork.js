import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ManageNetwork from './MyNetwork/ManageNetwork';
import BottomNav from './MyNetwork/BottomNav';
import Grow from './MyNetwork/Grow'; 
import CatchUp from './MyNetwork/CatchUp'; 

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function MyNetwork() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh' }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <ManageNetwork />
                        </Grid>
                        <Grid size={{ xs: 6, md: 8 }}>
                            <BottomNav value={value} handleChange={handleChange} />
                            <Grid size={{ xs: 6, md: 8 }}>
                                <Item>
                                {value === 0 && <Grow />}
                                {value === 1 && <CatchUp />}
                                </Item>
                            </Grid>
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}
