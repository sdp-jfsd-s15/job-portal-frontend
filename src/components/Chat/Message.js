import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { ChatArea } from './ChatArea';
import ConnectionsSearch from './ConnectionsSearch';
import API from '../../Hooks/Api';
import { useParams } from 'react-router-dom';

const Message = () => {
  const [usersConnection, setUsersConnection] = useState([]); // All connections
  const [filteredConnections, setFilteredConnections] = useState([]); // Filtered connections based on search
  const [activeUser, setActiveUser] = useState(null);
  const { username, firstName, lastName } = useParams(); // Extract URL params

  useEffect(() => {
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

    // If parameters are available in the URL, set activeUser
    if (username && firstName && lastName) {
      const userFromParams = {
        userName: username,
        firstName: firstName,
        lastName: lastName,
      };
      setActiveUser(userFromParams);
    } else {
      // Check sessionStorage for an active user
      const storedActiveUser = sessionStorage.getItem("activeUser");
      if (storedActiveUser) {
        setActiveUser(JSON.parse(storedActiveUser));
      }
    }
  }, [username, firstName, lastName]);

  const handleUserClick = (user) => {
    setActiveUser(user);
    sessionStorage.setItem("activeUser", JSON.stringify(user));
  };

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
            height: 'calc(100vh - 48px)',
            padding: 2,
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
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
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Grid
              item
              sx={{
                width: '40%',
                paddingRight: 0,
                overflowY: 'auto',
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
                height: '100%',
                overflow: 'hidden',
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
