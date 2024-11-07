import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MetaInfo from './Profile-Components/MetaInfo';
import URLLinks from './Profile-Components/URLLinks';
import AboutMe from './Profile-Components/AboutMe';
import { useParams } from 'react-router-dom';
import API from '../../../Hooks/Api';

const PProfile = () => {
    const [ userdetails, setUserDetails ] = React.useState({});
    const { username } = useParams();

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const url = `/v1/api/users/getDetails/${username}`;
                const response = await API.get(url);
                console.log(response.data);
                setUserDetails(response.data);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchProfile();
    }, [username]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '100vh' }}>
                    <Grid container spacing={3}> {/* Added spacing={3} for better gap */}
                        <Grid item xs={12} md={8}> {/* Used 'item' instead of 'size' */}
                            <MetaInfo userdetails={userdetails} />
                            <AboutMe userdetails={userdetails} />
                        </Grid>
                        <Grid item xs={12} md={4}> {/* Used 'item' instead of 'size' */}
                            <URLLinks userdetails={userdetails} />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default PProfile;
