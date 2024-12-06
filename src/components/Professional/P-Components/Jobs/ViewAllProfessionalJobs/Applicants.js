import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Container,
    Grid,
} from '@mui/material';
import API from '../../../../../Hooks/Api';

const Applicants = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [selectedUsernames, setSelectedUsernames] = useState([]);
    const [rejectedUsernames, setRejectedUsernames] = useState([]);
    const [sendSelectedApplicants, setSendSelectedApplicants] = useState([]);
    const [sendRejectedApplicants, setSendRejectedApplicants] = useState([]);
    // const [fileName, setFileName] = useState('applicants');

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const url = `/v1/api/jobApplicants/getJobApplicantsList/${id}`;
                const response = await API.get(url);
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchApplicants();
    }, [id]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const normalizedData = sheetData.map((row) => {
                const normalizedRow = {};
                Object.keys(row).forEach((key) => {
                    const trimmedKey = key.trim(); // Trim spaces from the header
                    normalizedRow[trimmedKey] = row[key];
                });
                return normalizedRow;
            });

            console.log("Normalized Data:", normalizedData);

            const selected = normalizedData.map((row) => row.Selected?.trim()).filter((val) => val);
            const rejected = normalizedData.map((row) => row.Rejected?.trim()).filter((val) => val);

            setSelectedUsernames(selected);
            setRejectedUsernames(rejected);

            validateApplicants(selected, rejected);
        };

        reader.readAsArrayBuffer(file);
    };

    const validateApplicants = (selected, rejected) => {
        const selectedApplicants = data.applicants.filter((applicant) =>
            selected.includes(applicant.userName)
        );
        const rejectedApplicants = data.applicants.filter((applicant) =>
            rejected.includes(applicant.userName)
        );

        setSendSelectedApplicants(selectedApplicants);
        setSendRejectedApplicants(rejectedApplicants);

        // Log unmatched usernames for debugging
        const unmatchedSelected = selected.filter(
            (userName) => !data.applicants.some((applicant) => applicant.userName === userName)
        );
        const unmatchedRejected = rejected.filter(
            (userName) => !data.applicants.some((applicant) => applicant.userName === userName)
        );

        console.log("Unmatched Selected Usernames:", unmatchedSelected);
        console.log("Unmatched Rejected Usernames:", unmatchedRejected);

        // Log directly instead of logging state
        console.log("Selected Applicants (Pre-State):", selectedApplicants);
        console.log("Rejected Applicants (Pre-State):", rejectedApplicants);
    };

    useEffect(() => {
        console.log("sendSelectedApplicants updated:", sendSelectedApplicants);
    }, [sendSelectedApplicants]);

    useEffect(() => {
        console.log("sendRejectedApplicants updated:", sendRejectedApplicants);
    }, [sendRejectedApplicants]);

    const handleSendResults = async () => {
        try {
            const url = `/v1/api/jobApplicants/updateJobApplicant/${data.jobId}`;
            const requestJSON = {
                selectedApplicants: sendSelectedApplicants,
                rejectedApplicants: sendRejectedApplicants
            }
            const response = await API.put(url, requestJSON);
            console.log(response);
            window.location.reload();
        }
        catch (err) {
            console.log(err);
        }
    }

    const exportToExcel = (data, tableName) => {
        // Map data to only include the specific fields you want
        const filteredData = data.map((row, index) => ({
            'S.no': index + 1,
            'Username': row.userName,
            'Name': `${row.firstName} ${row.middleName || ''} ${row.lastName}`,
            'Email': row.email,
            'Phone': row.contactInfo?.phone || 'N/A',
            'Gender': row.gender,
            'Resume URL': row.resumeUrl || 'N/A',
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
        const blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })], {
            type: 'application/octet-stream',
        });
        const fileName = tableName + "-" + id;
        saveAs(blob, `${fileName.trim() || 'table'}.xlsx`);
    }

    // Function to export table as PDF
    const exportToPDF = (data, tableName) => {
        const doc = new jsPDF();
        doc.text(`${tableName}`, 20, 10);
        doc.autoTable({
            head: [['S.no', 'Username', 'Name', 'Email', 'Phone', 'Gender', 'Resume URL']],
            body: data.map((row, index) => [
                index + 1,
                row.userName,
                `${row.firstName} ${row.middleName || ''} ${row.lastName}`,
                row.email,
                row.contactInfo?.phone || 'N/A',
                row.gender,
                row.resumeUrl || 'N/A',
            ]),
        });
        const fileName = tableName + "-" + id;
        doc.save(`${fileName.trim() || 'table'}.pdf`);
    };


    // Render table rows
    const renderTableRows = (rows) =>
        rows.map((row, index) => (
            <TableRow key={row.user_id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.userName}</TableCell>
                <TableCell align="center">{`${row.firstName} ${row.middleName || ''} ${row.lastName}`}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.contactInfo?.phone || 'N/A'}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">
                    {row.resumeUrl ? (
                        <a href={row.resumeUrl} target="_blank" rel="noopener noreferrer">
                            View Resume
                        </a>
                    ) : (
                        'N/A'
                    )}
                </TableCell>
            </TableRow>
        ));

    const renderTable = (rows, tableName) => (
        <TableContainer
            component={Paper}
            sx={{
                marginTop: -4,
                maxHeight: '400px',
                overflowX: 'auto',
            }}
        >
            <h3 style={{ textAlign: 'center' }}>{tableName}</h3>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><strong>S.no</strong></TableCell>
                        <TableCell align="center"><strong>Username</strong></TableCell>
                        <TableCell align="center"><strong>Name</strong></TableCell>
                        <TableCell align="center"><strong>Email</strong></TableCell>
                        <TableCell align="center"><strong>Phone</strong></TableCell>
                        <TableCell align="center"><strong>Gender</strong></TableCell>
                        <TableCell align="center"><strong>Resume URL</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.length > 0 ? (
                        renderTableRows(rows)
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} align="center">
                                No rows to show
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div style={{ padding: '20px' }}>
            <Container
                maxWidth="md"
                style={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid container spacing={2} style={{ paddingBottom: 6 }}>
                    <Grid item xs={4}>
                        <ArrowBackIcon
                            onClick={() => navigate('/professional/view-all-my-posted-jobs')}
                            style={{ cursor: 'pointer' }}
                        />
                    </Grid>
                </Grid>
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

                <Box sx={{ marginBottom: '20px' }}>
                    {/* File Upload Input */}
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        style={{ marginBottom: '20px', display: 'block' }}
                    />
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {/* Display Selected and Rejected Usernames */}
                        <div>
                            <p><strong>Selected Usernames:</strong> {selectedUsernames.join(', ')}</p>
                            <p><strong>Rejected Usernames:</strong> {rejectedUsernames.join(', ')}</p>
                        </div>

                        {/* Update Applicants Button */}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSendResults}
                            disabled={sendSelectedApplicants.length === 0 && sendRejectedApplicants.length === 0} // Disable if no data
                        >
                            Update Applicants
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );

};

export default Applicants;
