import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const MaterialUITable = () => {
  // Example table data
  const columns = ['ID', 'Name', 'Email'];
  const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com' },
  ];

  // Function to export table as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Material-UI Table Export', 20, 10); // Title
    doc.autoTable({
      head: [columns],
      body: rows.map((row) => [row.id, row.name, row.email]),
    });
    doc.save('table.pdf'); // Save the PDF
  };

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align="center">
                  <strong>{col}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '20px', borderRadius: '8px' }}
        onClick={exportToPDF}
      >
        Save as PDF
      </Button>
    </div>
  );
};

export default MaterialUITable;
