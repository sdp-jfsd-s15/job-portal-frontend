import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Options from './Jobs/Options';
import DisplayJob from './Jobs/DisplayJob';
import API from '../../Hooks/Api';
import Pagination from '@mui/material/Pagination';

const UserJobPage = () => {
  const [savedCount, setSavedCount] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [jobDocuments, setJobDocuments] = useState([]);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState({
    page_size: 8,
    page_no: 1,
  });

  const fetchAllJobs = async () => {
    try {
      const response = await API.get('https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/job/getAllJobs', {
        params: { page_size: page.page_size, page_no: page.page_no },
      });
      const data = response.data;
      setSavedCount(data.savedJobs);
      setJobDocuments(data.jobs);
      setDocumentCount(data.count);
    } catch (error) {
      console.error('Error fetching all jobs:', error);
    }
  };

  const fetchFilteredJobs = async () => {
    try {
      console.log(filters);
      const response = await API.post(`https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/job/filter?page_size=${page.page_size}&page_no=${page.page_no}`, filters);
      const data = response.data;
      console.log(data.jobs);
      setSavedCount(data.savedJobs);
      setJobDocuments(data.jobs); // Set filtered jobs data
      setDocumentCount(data.count); // Set total document count
      // API call for fetching filtered jobs can be implemented here
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
    }
  };

  useEffect(() => {
    if (filters.length === 0) {
      fetchAllJobs();
    } else {
      fetchFilteredJobs(filters);
    }
    // eslint-disable-next-line
  }, [filters, page]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage({ ...page, page_no: 1 });
  };

  const handlePageChange = (event, newPageNo) => {
    setPage({ ...page, page_no: newPageNo });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '100vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Options
                totalDocumentsCount={savedCount}
                filtersSelected={filters}
                onApplyFilters={handleApplyFilters}
              />
            </Grid>
            <Grid item xs={12} md={6} ml={4} sx={{ backgroundColor: 'white' }}>
              <DisplayJob
                jobs={jobDocuments}
                page={page.page_no}
                pageSize={page.page_size}
                onPageChange={handlePageChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={Math.ceil(documentCount / page.page_size)}
              page={page.page_no}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default UserJobPage;
