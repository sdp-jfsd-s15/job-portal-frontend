import React, { useState, useCallback, useEffect } from 'react';
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
    const [bgImageSrc, setBgImageSrc] = useState(null);
    const [bgCrop, setBgCrop] = useState({ x: 0, y: 0 });
    const [bgZoom, setBgZoom] = useState(1);
    const [bgCroppedAreaPixels, setBgCroppedAreaPixels] = useState(null); // State for background image
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageSrc(reader.result);
            reader.readAsDataURL(file);

            setUserForm({
                ...userForm,
                profileImage: {
                    fileName: file.name,
                    fileSize: file.size,
                    fileOpenUrl: "",
                    thumbNailUrl: "",
                    file: file,
                },
            });
        }
    };

    const handleBackgroundImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setBgImageSrc(reader.result);
            reader.readAsDataURL(file);

            // Store background image file details in the userForm state
            setUserForm({
                ...userForm,
                backgroundImage: {
                    fileName: file.name,
                    fileSize: file.size,
                    fileOpenUrl: "",
                    thumbNailUrl: "",
                    file: file,
                },
            });
        }
    };

    useEffect(() => {
        console.log(userForm.profileImage);
        console.log(userForm.backgroundImage);
    }, [userForm.profileImage, userForm.backgroundImage]);

    const onCropComplete = useCallback((_, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const onBgCropComplete = useCallback((_, croppedAreaPixels) => {
        setBgCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            setUserForm({
                ...userForm,
                profileImageUrl: croppedImage,
            });
            setImageSrc(null);
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, setUserForm, userForm]);

    const showBgCroppedImage = useCallback(async () => {
        try {
            // Check if the image source is available
            if (!bgImageSrc || !bgCroppedAreaPixels) {
                console.error("No background image source or cropped area found");
                return;
            }

            // Crop the background image
            const croppedImage = await getCroppedImg(bgImageSrc, bgCroppedAreaPixels);

            // Log to verify
            console.log("Cropped background image:", croppedImage);

            // Update userForm with the cropped image URL
            setUserForm({
                ...userForm,
                backgroundImageUrl: croppedImage,
            });

            // Reset background image preview
            setBgImageSrc(null);
        } catch (e) {
            console.error("Error cropping background image:", e);
        }
    }, [bgImageSrc, bgCroppedAreaPixels, setUserForm, userForm]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    // const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    //     const image = new Image();
    //     image.src = imageSrc;
    //     await new Promise((resolve) => {
    //         image.onload = resolve;
    //     });

    //     const canvas = document.createElement("canvas");
    //     const ctx = canvas.getContext("2d");

    //     // Set canvas dimensions
    //     canvas.width = croppedAreaPixels.width;
    //     canvas.height = croppedAreaPixels.height;

    //     // Draw the cropped image on the canvas
    //     ctx.drawImage(
    //         image,
    //         croppedAreaPixels.x,
    //         croppedAreaPixels.y,
    //         croppedAreaPixels.width,
    //         croppedAreaPixels.height,
    //         0,
    //         0,
    //         croppedAreaPixels.width,
    //         croppedAreaPixels.height
    //     );

    //     // Get the base64 image URL
    //     return canvas.toDataURL("image/jpeg");
    // };



    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{ width: "100%", borderRadius: 1, padding: 2 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            width: 1000,
                            height: 194,
                            border: '2px dashed grey',
                            borderRadius: 1,
                            backgroundImage: userForm.backgroundImage ? `url(${userForm.backgroundImageUrl})` : '',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <label htmlFor="upload-bg-image" style={{ width: '100%', height: '100%' }}>
                            <IconButton
                                color="primary"
                                component="span"
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                }}
                            >
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Box>
                    <input
                        type="file"
                        id="upload-bg-image"
                        style={{ display: 'none' }}
                        onChange={handleBackgroundImageChange}
                    />
                </Box>
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

                {/* Background Image Cropper */}
                {bgImageSrc && (
                    <Box sx={{ position: 'relative', width: '100%', height: 300, mb: 3 }}>
                        <Cropper
                            image={bgImageSrc}
                            crop={bgCrop}
                            zoom={bgZoom}
                            aspect={1000 / 194}
                            onCropChange={setBgCrop}
                            onZoomChange={setBgZoom}
                            onCropComplete={onBgCropComplete}
                        />
                        <Slider
                            min={1}
                            max={3}
                            step={0.1}
                            value={bgZoom}
                            onChange={(e, zoom) => setBgZoom(zoom)}
                            sx={{ mt: 2 }}
                        />
                        <Button
                            onClick={showBgCroppedImage}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Crop & Save Background
                        </Button>
                    </Box>
                )}


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
                    {[{
                        label: "Email",
                        name: "email",
                        value: userForm.email,
                        readOnly: true,
                    }, {
                        label: "Username",
                        name: "userName",
                        value: userForm.userName,
                        readOnly: true,
                    }, {
                        label: "First Name",
                        name: "firstName",
                        value: userForm.firstName,
                    }, {
                        label: "Middle Name",
                        name: "middleName",
                        value: userForm.middleName,
                    }, {
                        label: "Last Name",
                        name: "lastName",
                        value: userForm.lastName,
                    }, {
                        label: "Role",
                        name: "role",
                        value: userForm.role,
                        type: "select",
                    }].map((field, index) => (
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
