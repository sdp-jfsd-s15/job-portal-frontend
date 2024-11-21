import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const LeftSidebar = ({ users, onClickUser, searchTerm }) => {
  const visibleUsers = users?.slice(0, 9) ?? [];

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 600,
        overflowY: 'auto',
        padding: 2,
      }}
    >
      {visibleUsers.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ color: 'gray', textAlign: 'center', marginTop: 2 }}
        >
          No connections to chat
        </Typography>
      ) : (
        visibleUsers.map((user) => (
          <Card
            key={user.userName}
            sx={{
              mb: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: user.userName === searchTerm ? 'lightblue' : 'white',  // Highlight matching user
            }}
            onClick={() => onClickUser(user)}
          >
            <Box sx={{ padding: 1 }}>
              <Avatar sx={{ width: 40, height: 40 }}>
                {user.firstName?.[0] ?? user.userName[0]}
                {user.lastName?.[0] ?? ''}
              </Avatar>
            </Box>

            <Box sx={{ flexGrow: 1, padding: 1 }}>
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h6" sx={{ color: 'darkblue' }}>
                  <b>
                    {user.firstName
                      ? `${user.firstName} ${user.lastName}`
                      : user.userName}
                  </b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{user.userName}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};