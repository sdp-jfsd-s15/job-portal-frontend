import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Checkbox,
    ListItemText,
    FormLabel,
} from '@mui/material';
import JoditEditor from 'jodit-react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const EditJobDialog = ({ job, onClose, onUpdate }) => {
    const editor = useRef(null);
    const [jobForm, setJobForm] = useState({ ...job });
    const [descriptionContent, setDescriptionContent] = useState(job.description);
    const [qualificationContent, setQualificationContent] = useState(job.qualifications);
    const [openDialog, setOpenDialog] = useState(false);
    const [newOption, setNewOption] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [country, setCountry] = useState(job.location.split(', ')[1] || '');
    const [state, setState] = useState(job.location.split(', ')[0] || '');


    // Options for dropdowns

    const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Temporary', 'Freelancer'];
    const categories = ['Software Development', 'Data Science', 'Design', 'Marketing'];
    const skillsOptions = ['Java', 'Spring Boot', 'React', 'SQL', 'Python', 'Node.js'];
    const filterOptions = ['Web Development', 'Full Stack', 'Backend Development', 'Frontend Development'];

    // Handle changes in text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobForm({ ...jobForm, [name]: value });
    };

    // Handle multi-select fields (skills, filters)
    const handleMultiSelectChange = (e, field) => {
        const { value } = e.target;
        setJobForm({ ...jobForm, [field]: typeof value === 'string' ? value.split(',') : value });
    };

    const handleCountryChange = (value) => {
        setCountry(value);
        setJobForm({
            ...jobForm,
            location: `${state}, ${value}`,
        });
    };

    const handleStateChange = (value) => {
        setState(value);
        setJobForm({
            ...jobForm,
            location: `${value}, ${country}`,
        });
    };
    // Handle Save
    const handleSave = () => {
        onUpdate({ ...jobForm, description: descriptionContent });
    };

    // Dialog handlers for adding new options
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
            setJobForm((prevForm) => ({
                ...prevForm,
                [selectedField]: [...(prevForm[selectedField] || []), newOption],
            }));
            handleCloseDialog();
        }
    };

    useEffect(() => {
        // Update jobForm with description and qualification contents
        setJobForm((prevJobForm) => ({
            ...prevJobForm,
            description: descriptionContent,
            qualifications: qualificationContent,
        }));
    }, [descriptionContent, qualificationContent]);

    return (
        <>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    {/* Company */}
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

                    {/* Job Title */}
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

                    {/* Job Type */}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Job Type</InputLabel>
                            <Select
                                name="type"
                                value={jobForm.type}
                                onChange={handleChange}
                            >
                                {jobTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
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

                    {/* Country */}
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
                                        boxSizing: 'border-box',
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
                                    boxSizing: 'border-box',
                                }}
                            />
                        </Grid>
                    </Grid>

                    {/* Description */}
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

                    {/* Skills & Filters */}
                    {['skills', 'filters'].map((field) => (
                        <Grid item xs={12} key={field}>
                            <FormControl fullWidth>
                                <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                                <Select
                                    name={field}
                                    multiple
                                    value={jobForm[field] || []}
                                    onChange={(e) => handleMultiSelectChange(e, field)}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {(field === 'skills' ? skillsOptions : filterOptions).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            <Checkbox checked={jobForm[field]?.indexOf(option) > -1} />
                                            <ListItemText primary={option} />
                                        </MenuItem>
                                    ))}
                                    <MenuItem onClick={() => handleOpenDialog(field)}>+ Add</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>

            {/* Actions */}
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Update
                </Button>
            </DialogActions>

            {/* Add New Option Dialog */}
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
        </>
    );
};

export default EditJobDialog;
