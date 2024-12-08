import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
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
        if (name === 'summary' || name === 'about' || name === 'gender' || name === 'resume') {
            // Handle fields that are directly in userForm
            setUserForm({ ...userForm, [name]: value });
        } else {
            // Handle fields nested in contactInfo
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

    const handleCountryChange = (value) => {
        setCountry(value);
        setUserForm({
            ...userForm,
            contactInfo: {
                ...userForm.contactInfo,
                country: value,
            },
            location: `${state}, ${value}`
        });
    };

    const handleStateChange = (value) => {
        setState(value);
        setUserForm({
            ...userForm,
            contactInfo: {
                ...userForm.contactInfo,
                state: value,
            },
            location: `${value}, ${country}`
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
                            defaultCountry="US"
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

            {/* File Upload Section */}
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                    <TextField
                        label="Resume URL"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="resume"
                        value={userForm.resume}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>


            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button variant="contained" color="primary" onClick={onPrev}>
                    PREV
                </Button>
                <Button variant="contained" color="primary" onClick={onNext}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default ContactInfoForm;
