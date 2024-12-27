import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Typography, Grid, Box } from "@mui/material";
import API from "../../../../Hooks/Api";

const Grow = () => {
  const [requestsReceived, setRequestReceived] = useState([]);

  const handleAccept = async (userName) => {
    // Handle Accept Logic Here
    try {
      const url = `https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/connections/updateConnection/${userName}/ACCEPTED`;
      const response = await API.put(url); // Send the PUT request to the API
      console.log('Connection accepted:', response.data); // Optionally log the response data
      window.location.reload();
    } catch (err) {
      console.log('Error accepting connection:', err); // Log any error that occurs
    }
  };

  const handleReject = async (userName) => {
    // Handle Reject Logic Here
    try {
      const url = `https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/connections/updateConnection/${userName}/REJECTED`;
      const response = await API.put(url); // Send the PUT request to the API
      console.log('Connection accepted:', response.data); // Optionally log the response data
      window.location.reload();
    } catch (err) {
      console.log('Error accepting connection:', err); // Log any error that occurs
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const url = "https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/connections/getConnectionRequests";
        const response = await API.get(url);
        setRequestReceived(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      {requestsReceived.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No pending invitations
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {requestsReceived.map((request, index) => (
            <Grid item xs={12} key={index}>
              <Card variant="outlined" style={{ display: "flex", alignItems: "center", padding: "10px", width: "100%" }}>
                <Avatar style={{ marginRight: "15px" }}>
                  {request.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  {request.userName}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleAccept(request.userName)}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReject(request.userName)}
                >
                  Reject
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Grow;
