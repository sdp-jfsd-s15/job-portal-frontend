import { Box, Button } from '@mui/material'
import React from 'react'

const RejectedAppliciants = ({ exportToPDF, exportToExcel, data, renderTable }) => {
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToPDF(data.rejectedApplicants || [], 'Rejected Applicants')}
                >
                    Save as PDF
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToExcel(data.rejectedApplicants || [], 'Rejected Applicants')}
                >
                    Save as Excel
                </Button>
            </Box>
            {renderTable(data.rejectedApplicants || [], 'Rejected Applicants')}
        </Box>
    )
}

export default RejectedAppliciants