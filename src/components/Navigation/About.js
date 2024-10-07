import React from 'react';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function About({ aboutAnchorEl, handleAboutMenuClose }) {
  return (
    <Menu
      anchorEl={aboutAnchorEl}
      open={Boolean(aboutAnchorEl)}
      onClose={handleAboutMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{ mt: 1 }}
    >
      <Grid container sx={{ p: 3, minWidth: '200px', minHeight: '300px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f6fc' }} spacing={3}>
        <Grid item xs={12} sm={8} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7, justifyContent: 'center', alignItems: 'center' }}>
            {/* Left: About Text */}
            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" sx={{ fontSize: '1.2rem', lineHeight: '1.2', mb: 1, fontWeight: 'bold' }}>
                About the Project
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', mb: 1, mt: 2 }}>
                This Job Portal project was developed as part of the Java Full Stack Development course. It provides an easy-to-use platform for users to browse job listings, apply for jobs, and manage their profiles.
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                We hope you find it helpful in your job search journey!
              </Typography>
            </Box>

            {/* Right: Team Members with Images */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <img src="teammate1.jpg" alt="Teammate 1" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Teammate 1
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    teammate1@example.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <img src="teammate2.jpg" alt="Teammate 2" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Teammate 2
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                    teammate2@example.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Menu>
  );
}

export default About;
