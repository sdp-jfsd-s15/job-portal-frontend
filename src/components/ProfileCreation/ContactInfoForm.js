import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const ContactInfoForm = ({ userForm, setUserForm, onNext, onPrev }) => {
    const [country, setCountry] = useState(userForm.contactInfo.country || '');
    const [state, setState] = useState(userForm.contactInfo.state || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'summary' || name === 'about' || name === 'gender') {
            setUserForm({ ...userForm, [name]: value });
        } else {
            setUserForm({
                ...userForm,
                contactInfo: { ...userForm.contactInfo, [name]: value }
            });
        }
    };

    const handleDateChange = (date) => {
        setUserForm({
            ...userForm,
            contactInfo: { ...userForm.contactInfo, birthday: date ? dayjs(date).format("DD/MM/YYYY") : "" }
        });
    };

    const handleImageChange = (e) => {
        console.log(e.target.files);
    };

    const handleCountryChange = (value) => {
        setCountry(value); // Update country state
        // Update userForm location with the new country
        setUserForm({
            ...userForm,
            contactInfo: {
                ...userForm.contactInfo,
                country: value, // Set country directly
            },
            location: `${state}, ${value}` // Combine state and country in location
        });
    };

    const handleStateChange = (value) => {
        setState(value); // Update state
        // Update userForm location with the new state and country
        setUserForm({
            ...userForm,
            contactInfo: {
                ...userForm.contactInfo,
                state: value, // Set state directly
            },
            location: `${value}, ${country}` // Combine state and country in location
        });
    };
    return (
        <Box sx={{ width: "100%", height: 550, borderRadius: 1, padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            label="Gender"
                            variant="outlined"
                            name="gender"
                            value={userForm.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <div style={{ paddingLeft: 30 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birthday"
                                value={userForm.contactInfo.birthday ? dayjs(userForm.contactInfo.birthday, "DD/MM/YYYY") : null}
                                onChange={handleDateChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        fullWidth
                                        name="birthday"
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={userForm.contactInfo.phone}
                            onChange={(phone) => handleChange({ target: { name: 'phone', value: phone } })}
                            defaultCountry="US" // Example: set default country code if needed
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
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="address"
                        value={userForm.contactInfo.address}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel shrink id="country-label">Select Country</InputLabel>
                        <CountryDropdown
                            value={country}
                            onChange={handleCountryChange}
                            classes="country-select"
                            id="country-dropdown"
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
                <Grid item xs={4}>
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel shrink id="state-label">Select State</InputLabel>
                        <RegionDropdown
                            country={country}
                            value={state}
                            onChange={handleStateChange}
                            classes="state-select"
                            id="state-dropdown"
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
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel>Summary</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={userForm.summary}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid> */}
                {/* <Grid item xs={6}>
                    <TextField
                        label="Summary"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="summary"
                        value={userForm.summary}
                        onChange={handleChange}
                    />
                </Grid> */}
                {/* <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel>About</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={userForm.about}
                            onChange={handleChange}
                        />
                    </FormControl>
                </Grid> */}
                {/* <Grid item xs={6}>
                    <TextField
                        label="About"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="about"
                        value={userForm.about}
                        onChange={handleChange}
                    />
                </Grid> */}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload files
                    <input
                        type="file"
                        onChange={handleImageChange}
                        multiple
                        hidden
                    />
                </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onPrev}
                >
                    PREV
                </Button>
                <Button
                        variant="contained"
                        color="primary"
                        onClick={onNext}
                    >
                        Next
                    </Button>
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                >
                    Submit
                </Button> */}
            </Box>
        </Box>
    );
};

export default ContactInfoForm;
