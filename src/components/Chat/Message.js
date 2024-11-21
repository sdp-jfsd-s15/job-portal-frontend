import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { ChatArea } from './ChatArea';
import ConnectionsSearch from './ConnectionsSearch';
import API from '../../Hooks/Api';

const Message = () => {
  const [usersConnection, setUsersConnection] = useState([]); // All connections
  const [filteredConnections, setFilteredConnections] = useState([]); // Filtered connections based on search

  React.useEffect(() => {
    const fetchConnectionOfUser = async () => {
      try {
        const url = "/v1/api/connections/get";
        const response = await API.get(url);
        setUsersConnection(response.data.connections);
        setFilteredConnections(response.data.connections); // Set all users initially
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchConnectionOfUser();
  }, []);

  const [activeUser, setActiveUser] = useState(null);

  const handleUserClick = (user) => {
    setActiveUser(user);
  };

  // This will be passed to the ConnectionsSearch component
  const handleSearch = (searchText) => {
    if (!searchText) {
      setFilteredConnections(usersConnection); // Show all if no search
    } else {
      const filtered = usersConnection.filter((user) =>
        user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredConnections(filtered); // Filtered list based on search text
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: -5, mb: 3 }}>
        <Box
          sx={{
            bgcolor: 'white',
            height: 'calc(100vh - 48px)', // Ensure it fills the remaining viewport height
            padding: 2,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column', // Flex column for header and content
          }}
        >
          {/* Header Section */}
          <Box>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography variant="h6">
                  <b>Messaging</b>
                </Typography>
              </Grid>
              <Grid item xs>
                <ConnectionsSearch onSearch={handleSearch} />
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 2 }} />
          </Box>

          {/* Content Section */}
          <Grid
            container
            sx={{
              flex: 1, // Allow the content section to expand
              overflow: 'hidden', // Prevent overflow of the grid container
            }}
          >
            <Grid
              item
              sx={{
                width: '40%',
                paddingRight: 0,
                overflowY: 'auto', // Enable scrolling for the LeftSidebar
                maxHeight: '100%',
              }}
            >
              <LeftSidebar users={filteredConnections} onClickUser={handleUserClick} />
            </Grid>
            <Grid
              item
              sx={{
                width: '60%',
                paddingLeft: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Ensure ChatArea takes full height
                overflow: 'hidden', // Prevent overflow
              }}
            >
              <ChatArea activeUser={activeUser} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Message;
