import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

const UserInfoForm = ({ userForm, setUserForm, onNext }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };


    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{ width: "100%", borderRadius: 1, padding: 2 }}>
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
