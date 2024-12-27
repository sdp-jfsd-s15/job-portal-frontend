import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, TextField, FormControl, InputLabel, MenuItem, Select, Button, Checkbox, ListItemText, Typography, FormLabel, DialogActions, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Token/AuthContext';
import JoditEditor from 'jodit-react';
import API from '../../../../Hooks/Api';

const PostAJob = () => {
    const editor = useRef(null);
    const [descriptionContent, setDescriptionContent] = useState('');
    const [qualificationContent, setQualificationContent] = useState('');

    const { user } = useAuth();
    const navigate = useNavigate();
    const [jobForm, setJobForm] = useState({
        createdBy: user.username,
        company: '',
        title: '',
        description: '',
        qualifications: '',
        location: '',
        type: '',
        category: '',
        experience: '',
        skills: [],
        salary: '',
        vacancy: 1,
        filters: [],
    });

    const [jobTypes, setJobTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [skillsOptions, setSkillsOptions] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);


    useEffect(() => {
        // Update jobForm with description and qualification contents
        setJobForm((prevJobForm) => ({
            ...prevJobForm,
            description: descriptionContent,
            qualifications: qualificationContent,
        }));
    }, [descriptionContent, qualificationContent]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const url = "https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/filter/filters";
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

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    const handleCountryChange = (value) => {
        setCountry(value);
        setJobForm({
            ...jobForm,
            location: `${state}, ${value}`
        });
    };

    const handleStateChange = (value) => {
        setState(value);
        setJobForm({
            ...jobForm,
            location: `${value}, ${country}`
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobForm({ ...jobForm, [name]: value });
    };

    const [openDialog, setOpenDialog] = useState(false);
    const [newOption, setNewOption] = useState('');
    const [selectedField, setSelectedField] = useState(''); // To store the field name (jobTypes, categories, etc.)

    const handleOpenDialog = (field) => {
        setSelectedField(field);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewOption('');
    };

    const handleAddNewOption = () => {
        if (newOption.trim() !== '') {
            console.log("Adding new option to:", selectedField, "Option:", newOption);

            // Ensure selectedField is either 'skills' or 'filters' before modifying them
            if (selectedField === 'skills' || selectedField === 'filters') {
                // Add the new option to the array
                setJobForm(prevForm => ({
                    ...prevForm,
                    [selectedField]: [
                        ...(prevForm[selectedField] || []), // Existing values
                        newOption // New option added
                    ]
                }));
            } else if (selectedField === 'type' || selectedField === 'category') {
                // For type or category, just replace the existing value with the new option
                setJobForm(prevForm => ({
                    ...prevForm,
                    [selectedField]: newOption
                }));
            }

            handleCloseDialog();
        }
    };



    const handleMultiSelectChange = (e, field) => {
        const { value } = e.target;
        setJobForm({ ...jobForm, [field]: typeof value === 'string' ? value.split(',') : value });
    };

    const handleSubmit = async () => {
        const cleanedJobForm = {
            ...jobForm,
            skills: jobForm.skills.filter(skill => skill != null),
            filters: jobForm.filters.filter(filter => filter != null),
        };

        console.log('Job Form Data:', cleanedJobForm);
        console.log(cleanedJobForm.skills);

        try {
            const url = "/v1/api/job/add";
            const response = await API.post(url, cleanedJobForm);

            if (response.status === 200 || response.status === 201) {
                // Reset the form fields
                setJobForm({
                    userName: user.username,
                    company: '',
                    title: '',
                    description: '',
                    qualifications: '',
                    location: '',
                    type: '',
                    category: '',
                    experience: '',
                    skills: [],
                    salary: '',
                    vacancy: 1,
                    filters: [],
                });

                navigate("/professional/work");
            }
        } catch (err) {
            console.log("Error submitting job form:", err);
        }
    };

    return (
        <Container maxWidth="md" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Grid container spacing={2} style={{ paddingBottom: 10 }}>
                <Grid item xs={4}>
                    <ArrowBackIcon
                        onClick={() => navigate("/professional/work/")}
                        style={{ cursor: "pointer" }}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h6" component="div" sx={{ ml: 2, mb: 2 }}>
                        <b>
                            Post A New Opening
                        </b>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Company Name"
                        name="company"
                        value={jobForm.company}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Job Title"
                        name="title"
                        value={jobForm.title}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel>Description</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={descriptionContent}
                            onChange={(newContent) => setDescriptionContent(newContent)}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel>Qualifications</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={qualificationContent}
                            onChange={(newContent) => setQualificationContent(newContent)}
                        />
                    </FormControl>
                </Grid>

                <Grid container item spacing={2} xs={12}>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel shrink>Select Country</InputLabel>
                            <CountryDropdown
                                value={country}
                                onChange={handleCountryChange}
                                classes="country-select"
                                style={{
                                    height: '56px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    fontSize: '16px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel shrink>Select State</InputLabel>
                        <RegionDropdown
                            country={country}
                            value={state}
                            onChange={handleStateChange}
                            classes="state-select"
                            style={{
                                height: '56px',
                                width: '100%',
                                borderRadius: '4px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </Grid>
                </Grid>


                <Grid item xs={4}>
                    <TextField
                        label="Salary"
                        name="salary"
                        value={jobForm.salary}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>


                <Grid item xs={4}>
                    <TextField
                        label="Vacancy"
                        name="vacancy"
                        type="number"
                        value={jobForm.vacancy}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        label="Experience"
                        name="experience"
                        value={jobForm.experience}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Job Type</InputLabel>
                        <Select
                            name="type"
                            value={jobForm.type}
                            onChange={(e) => handleChange(e)}
                            renderValue={(selected) => selected}
                        >
                            {jobTypes.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => handleOpenDialog('type')}>+ Add</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={jobForm.category}
                            onChange={(e) => handleChange(e)}
                            renderValue={(selected) => selected}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            <MenuItem onClick={() => handleOpenDialog('category')}>+ Add</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {['skills', 'filters'].map((field) => (
                    <Grid item xs={12} key={field}>
                        <FormControl fullWidth>
                            <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                            <Select
                                name={field}
                                multiple
                                value={jobForm[field]}
                                onChange={(e) => handleMultiSelectChange(e, field)}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {(field === 'skills' ? skillsOptions : filterOptions).map((option) => (
                                    <MenuItem key={option} value={option}>
                                        <Checkbox checked={jobForm[field].indexOf(option) > -1} />
                                        <ListItemText primary={option} />
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={() => handleOpenDialog(field)}>+ Add</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                ))}


                <Grid item xs={12} container justifyContent="center">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit Job
                    </Button>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography variant="h6">Description:</Typography>
                    <div dangerouslySetInnerHTML={{ __html: jobForm.description }} />
                    <hr />
                    <Typography variant="h6">Qualification:</Typography>
                    <div dangerouslySetInnerHTML={{ __html: jobForm.qualification }} />
                </Grid> */}
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Option</DialogTitle>
                <DialogContent>
                    <TextField
                        label="New Option"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        fullWidth
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddNewOption} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PostAJob;
