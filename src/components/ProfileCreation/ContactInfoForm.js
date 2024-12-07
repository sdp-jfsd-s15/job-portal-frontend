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
    const [selectedFile, setSelectedFile] = useState(userForm.resume.file || null);

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
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            const fileSize = file.size;
            const fileName = file.name;
            
            setSelectedFile({
                fileName,
                fileSize,
                fileOpenUrl: fileURL,
                file: file, // The actual file to upload
                thumbNailUrl: fileURL // For preview (you can customize this later if needed)
            });
            setUserForm({
                ...userForm,
                resume: {
                    fileName,
                    fileSize,
                    fileOpenUrl: fileURL,
                    file: file,
                    thumbNailUrl: fileURL
                }
            });
        }
    };

    const handleFileRemove = () => {
        setSelectedFile(null);
        setUserForm({
            ...userForm,
            resume: {
                fileName: "",
                fileSize: null,
                fileOpenUrl: "",
                thumbNailUrl: "",
                file: null
            }
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    {selectedFile ? "Change File" : "Upload PDF"}
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept=".pdf"
                        hidden
                    />
                </Button>
                {selectedFile && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <div>File: {selectedFile.fileName}</div>
                        <div>Size: {Math.round(selectedFile.fileSize / 1024)} KB</div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleFileRemove}
                            sx={{ mt: 1 }}
                        >
                            Remove File
                        </Button>
                    </Box>
                )}
            </Box>

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
