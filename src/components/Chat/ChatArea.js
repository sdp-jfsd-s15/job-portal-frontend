import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ChatArea = ({ activeUser }) => {
    return (
      <Box sx={{
        height: 'calc(100vh - 64px)', // Fixed height minus header height
        padding: 2,
        backgroundColor: '#fafafa',
      }}>
        {activeUser ? (
          <>
            <Typography variant="h5" gutterBottom>
              Chat with {activeUser.firstName} {activeUser.lastName}
            </Typography>
            {/* Chat content goes here */}
          </>
        ) : (
          <Typography variant="h6">Select a user to start chatting</Typography>
        )}
      </Box>
    );
  };