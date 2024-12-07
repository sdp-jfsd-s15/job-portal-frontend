import React from 'react';
import { Box, Button } from '@mui/material';


const AllApplicants = ({ exportToPDF, exportToExcel, data, renderTable }) => {
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToPDF(data.applicants || [], 'Applicants')}
                >
                    Save as PDF
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToExcel(data.applicants || [], 'Applicants')}
                >
                    Save as Excel
                </Button>
            </Box>
            {renderTable(data.applicants || [], 'Applicants')}
        </Box>
    );
};

export default AllApplicants;
