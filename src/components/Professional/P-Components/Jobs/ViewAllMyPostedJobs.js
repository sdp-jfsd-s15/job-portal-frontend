import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProfessionalMetaJobs from './ViewAllProfessionalJobs/ProfessionalMetaJobs';
import IndividualJob from './ViewAllProfessionalJobs/IndividualJob';
import { Typography } from '@mui/material';

const ViewAllMyPostedJobs = () => {
  const [selectedJob, setSelectedJob] = React.useState(null); // Track the selected job

  const handleJobClick = (job) => {
    setSelectedJob(job); // Update selected job state
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          height: '100vh', // Adds padding to the entire layout (optional)
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <ProfessionalMetaJobs onJobClick={handleJobClick}  /> {/* Pass handleJobClick as a prop */}
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                height: '100vh',
                // overflowY: 'auto', // Remove internal padding to avoid spacing
              }}
            >
              {selectedJob ? (
                <IndividualJob job={selectedJob} /> // Pass the selected job to IndividualJob component
              ) : (
                <Typography>Select a job to view details.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default ViewAllMyPostedJobs;
