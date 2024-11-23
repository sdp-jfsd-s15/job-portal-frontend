import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Filters from './Filters'; // Import the Filters component
import API from '../../../Hooks/Api';

const Options = ({ totalDocumentsCount }) => {
    const [filtersOpen, setFiltersOpen] = useState(false); // State to manage Filters dialog
    const navigate = useNavigate();
    const [filtersSelected, setFiltersSelected] = useState({
        type: [],
        category: [],
        skills: [],
        filter: []
    })
    const [jobTypes, setJobTypes] = React.useState([]);
    const [categories, setCategories] = useState([]);
    const [skillsOptions, setSkillsOptions] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const url = "/v1/api/filter/filters";
                const response = await API.get(url);
                const data = response.data;
                setJobTypes(data.jobType);
                setCategories(data.jobCategory);
                setSkillsOptions(data.skills);
                setFilterOptions(data.jobCategory);
                console.log(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchFilters();
    }, [])

    const handleFiltersOpen = () => setFiltersOpen(true); // Open dialog
    const handleFiltersClose = () => setFiltersOpen(false); // Close dialog

    return (
        <React.Fragment>
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
                            color: "gray",
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                        onClick={handleFiltersOpen} // Open Filters dialog
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
                    <Button
                        sx={{
                            mt: 2,
                            mr: 5,
                            color: "gray",
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate("/professional/view-all-my-posted-jobs")}
                    >
                        <BookmarkIcon />
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'left' }}
                        >
                            My Jobs
                        </Typography>
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{ flex: 1, textTransform: 'none', ml: 1, textAlign: 'right' }}
                        >
                            {totalDocumentsCount}
                        </Typography>
                    </Button>
                </CardContent>
            </Card>
            <Filters open={filtersOpen} onClose={handleFiltersClose} /> {/* Include Filters dialog */}
        </React.Fragment>
    );
};

export default Options;
