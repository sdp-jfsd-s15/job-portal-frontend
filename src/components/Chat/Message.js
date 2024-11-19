import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { ChatArea } from './ChatArea';

const Message = () => {
  const [users] = useState([
    { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
    { firstName: 'Jane', lastName: 'Smith', username: 'janesmith' },
    { firstName: 'Michael', lastName: 'Brown', username: 'michaelbrown' },
    { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
    { firstName: 'Jane', lastName: 'Smith', username: 'janesmith' },
    { firstName: 'Michael', lastName: 'Brown', username: 'michaelbrown' },
    { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
    { firstName: 'Jane', lastName: 'Smith', username: 'janesmith' },
    { firstName: 'Michael', lastName: 'Brown', username: 'michaelbrown' },
    // Add more users as needed
  ]);

  const [activeUser, setActiveUser] = useState(null);

  const handleUserClick = (user) => {
    setActiveUser(user);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: -5, mb: 3 }}>
        <Box sx={{ bgcolor: 'white', height: '100vh', padding: 2, borderRadius: '8px' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h6">
                <b>
                  Messaging
                </b>
              </Typography>
            </Grid>
            <Grid item xs>
              <TextField
                variant="outlined"
                placeholder="Search"
                sx={{
                  width: '300px',
                  marginLeft: 6,
                  height: '35px', // Custom height
                  '& .MuiInputBase-root': {
                    height: '35px', // Override the height of the input element
                  }
                }}
              />
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2 }} />
          <Grid container sx={{ height: '100%' }}>
            <Grid item sx={{ width: '40%', paddingRight: 0 }}>
              <LeftSidebar users={users} onClickUser={handleUserClick} />
            </Grid>
            <Grid item sx={{ width: '60%', paddingLeft: 0 }}>
              <ChatArea activeUser={activeUser} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Message;
