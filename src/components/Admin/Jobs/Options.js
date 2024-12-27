import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import Filters from './Filters'; // Import the Filters component
import API from '../../../Hooks/Api';

const Options = ({ totalDocumentsCount, filtersSelected, onApplyFilters }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [availableFilters, setAvailableFilters] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await API.get('https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/filter/filters');
        const data = response.data;
        console.log(data);
        setAvailableFilters({
          type: data.jobType,
          category: data.jobCategory,
          skills: data.skills,
          filter: data.jobs,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchFilters();
  }, []);

  const handleFiltersOpen = () => setFiltersOpen(true);
  const handleFiltersClose = () => setFiltersOpen(false);

  return (
    <>
      <CssBaseline />
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ ml: 2, mb: 2 }}>
            <b>Options</b>
          </Typography>
          <Divider />
          <Button
            sx={{
              mt: 2,
              mr: 5,
              color: 'gray',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
            onClick={handleFiltersOpen}
          >
            <FilterListIcon />
            <Typography
              variant="body1"
              component="div"
              sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'left' }}
            >
              Filters
            </Typography>
          </Button>
        </CardContent>
      </Card>
      <Filters
        open={filtersOpen}
        onClose={handleFiltersClose}
        filters={availableFilters} // Pass available filters
        selectedFilters={filtersSelected} // Pass selected filters
        onApplyFilters={onApplyFilters} // Handle filter application
      />
    </>
  );
};

export default Options;
