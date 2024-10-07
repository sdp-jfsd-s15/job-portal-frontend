import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Contact({ contactAnchorEl, handleContactMenuClose }) {
  return (
    <Menu
      anchorEl={contactAnchorEl}
      open={Boolean(contactAnchorEl)}
      onClose={handleContactMenuClose}
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
      <Grid container sx={{ p: 3, minWidth: '500px', minHeight: '300px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f6fc' }} spacing={3}>
        <Grid item xs={12} sm={8} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7, justifyContent: 'center', alignItems: 'center' }}>
            {/* Left: Heading */}
            <Box sx={{ flex: 2 }}> {/* Increased flex value to give more space to this box */}
              <Typography variant="h6" sx={{ fontSize: '1.2rem', lineHeight: '1.2', mb: 1, fontWeight: 'bold' }}>
                Customers are at the <br /> heart of everything we do
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', mb: 1, mt: 2, whiteSpace: 'nowrap' }}>
                Call +91 00000 00000 {/* This should now fit in a single line */}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem' }}>
                <Link to="/contact/emailus" style={{ textDecoration: 'underline', color: 'inherit' }}>
                  Email us &gt;
                </Link>
              </Typography>
            </Box>

            {/* Right: Customer Care */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.2rem', mb: 1, fontWeight: 'bold' }}>
                Customer Care
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.5, mt: 0.5 }}>
                Assistance
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.5, mt: 0.5 }}>
                Support
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.5, mt: 0.5 }}>
                Rewards
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', mb: 0.5, mt: 0.5 }}>
                <Link to="/contact/faqs" style={{ textDecoration: 'underline', color: 'inherit' }}>
                  FAQs &gt;
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Menu>
  );
}

export default Contact;
