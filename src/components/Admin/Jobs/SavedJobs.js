import React, { useEffect, useState } from 'react';
import API from '../../../Hooks/Api';
import { Box, CssBaseline, Grid } from '@mui/material';
import SavedJobsList from './SavedJobsList';
import JobDetails from './JobDetails';

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchSavedJobs = async () => {
        try {
            const url = "/v1/api/job/getSavedJobs";
            const response = await API.get(url);
            setSavedJobs(response.data.jobs);
            if (response.data.jobs.length > 0) {
                selectJob(response.data.jobs[0].id); // Select the first job by default
            }
        } catch (err) {
            console.error(err);
        }
    };
    // Fetch saved jobs
    useEffect(() => {
        fetchSavedJobs();
        // eslint-disable-next-line
    }, []);

    // Fetch job details
    const fetchJobDetails = async (jobId) => {
        try {
            setLoading(true);
            const url = `/v1/api/job/getJob/${jobId}`;
            const response = await API.get(url);
            console.log(response.data);
            setJobDetails(response.data.jobData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle job selection
    const selectJob = (jobId) => {
        setSelectedJob(jobId);
        fetchJobDetails(jobId);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Box display="flex" height="100vh">
                <Grid container>
                    <Grid item xs={5}>
                        <SavedJobsList
                            savedJobs={savedJobs}
                            selectedJob={selectedJob}
                            selectJob={selectJob}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <Box
                            sx={{
                                height: '100vh',
                                // overflowY: 'auto', // Remove internal padding to avoid spacing
                            }}
                        >
                            <JobDetails job={jobDetails} loading={loading} fetchSavedJobs={fetchSavedJobs} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

export default SavedJobs;
