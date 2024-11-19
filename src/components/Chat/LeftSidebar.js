import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const LeftSidebar = ({ users, onClickUser }) => {
    const visibleUsers = users.slice(0, 9); // Show first 8 users
  
    return (
      <Box 
      sx={{
        width: '100%',
        maxHeight: 600,
        overflowY: 'auto',
      }}>
        {visibleUsers.map((user) => (
          <Card
            key={user.username}
            sx={{ mb: 1, width: '100%', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => onClickUser(user)}
          >
            {/* Avatar on the left side */}
            <Box sx={{ padding: 1 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
            </Box>
  
            {/* User Information on the right side */}
            <Box sx={{ flexGrow: 1, padding: 1 }}>
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h6" sx={{ color: 'darkblue' }}>
                  <b>{user.firstName} {user.lastName}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{user.username}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    );
  };