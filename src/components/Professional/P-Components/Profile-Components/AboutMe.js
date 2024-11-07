import { Card } from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const AboutMe = ({ userdetails }) => {
  return (
    <Card sx={{ width: '100%', position: 'relative', marginTop: 3 }}>
  <CardContent sx={{ marginTop: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography gutterBottom variant="h5" component="div">
        <b>About</b>
      </Typography>
      <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
    </Box>
    {userdetails.about}
  </CardContent>
</Card>
  )
}

export default AboutMe