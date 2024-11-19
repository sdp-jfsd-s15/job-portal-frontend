import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReactLoading from "react-loading";
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
    display: 'flex', // Make the content inside flexbox
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Spread items horizontally
    gap: theme.spacing(2), // Add spacing between items
}));

const SelectJobToView = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Item style={{ width: '100%', marginRight: 30}}>
                    {/* First loading spinner */}
                    <ReactLoading type="balls" color="#0000FF" height={50} width={50} />
                    
                    {/* Text */}
                    <Typography>
                        <b>
                        Select A Job to View
                        </b>
                    </Typography>
                    
                    {/* Second loading spinner */}
                    <ReactLoading 
                        type="balls" // Different animation for variety
                        color="#0000FF" 
                        height={50} 
                        width={50} 
                    />
                </Item>
            </Grid>
        </Box>
    )
}

export default SelectJobToView;
