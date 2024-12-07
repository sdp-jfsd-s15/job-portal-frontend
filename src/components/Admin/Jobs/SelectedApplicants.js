import { Box, Button } from '@mui/material'
import React from 'react'

const SelectedApplicants = ({ exportToPDF, exportToExcel, data, renderTable, company }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToPDF(data.selectedApplicants || [], 'Selected Applicants')}
                >
                    Save as PDF
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => exportToExcel(data.selectedApplicants || [], 'Selected Applicants')}
                >
                    Save as Excel
                </Button>
            </Box>
            {renderTable(data.selectedApplicants || [], 'Selected Applicants')}
        </Box>
    )
}

export default SelectedApplicants