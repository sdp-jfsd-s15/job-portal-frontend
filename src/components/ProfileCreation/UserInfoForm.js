import React, { useState, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Cropper from 'react-easy-crop';
import Slider from '@mui/material/Slider';
import getCroppedImg from './cropImage';
import Tooltip from '@mui/material/Tooltip';

const UserInfoForm = ({ userForm, setUserForm, onNext }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            setUserForm({ ...userForm, profileImageUrl: croppedImage });
            setImageSrc(null); // Close cropping interface after cropping
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, setUserForm, userForm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{ width: "100%", height: '100%', borderRadius: 1, padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, position: 'relative' }}>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        alt="Profile Image"
                        src={userForm.profileImageUrl}
                    />
                    <label htmlFor="upload-image">
                        <IconButton
                            color="primary"
                            component="span"
                            sx={{ position: 'absolute', bottom: 0, right: 0 }}
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <input
                        type="file"
                        id="upload-image"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </Box>

                {/* Image Cropper Modal */}
                {imageSrc && (
                    <Box sx={{ position: 'relative', width: '100%', height: 300, mb: 3 }}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                        <Slider
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e, zoom) => setZoom(zoom)}
                            sx={{ mt: 2 }}
                        />
                        <Button
                            onClick={showCroppedImage}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Crop & Save
                        </Button>
                    </Box>
                )}

                <Grid container spacing={2}>
                    {[
                        { label: "Email", name: "email", value: userForm.email, readOnly: true },
                        { label: "Username", name: "userName", value: userForm.userName, readOnly: true },
                        { label: "First Name", name: "firstName", value: userForm.firstName },
                        { label: "Middle Name", name: "middleName", value: userForm.middleName },
                        { label: "Last Name", name: "lastName", value: userForm.lastName },
                        { label: "Role", name: "role", value: userForm.role, type: "select" },
                    ].map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            {field.readOnly ? (
                                <Tooltip title="You cannot edit" arrow>
                                    <span>
                                        <TextField
                                            label={field.label}
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            name={field.name}
                                            value={field.value}
                                            InputProps={{ readOnly: true }}
                                        />
                                    </span>
                                </Tooltip>
                            ) : field.type === "select" ? (
                                <TextField
                                    select
                                    label={field.label}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="USER">USER</MenuItem>
                                    <MenuItem value="PROFESSIONAL">PROFESSIONAL</MenuItem>
                                </TextField>
                            ) : (
                                <TextField
                                    label={field.label}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name={field.name}
                                    value={field.value}
                                    onChange={handleChange}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>


                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onNext}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default UserInfoForm;
