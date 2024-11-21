import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import 'react-phone-number-input/style.css';
import JoditEditor from 'jodit-react';
import { FormLabel } from '@mui/material';


const PersonalInfo = ({ userForm, setUserForm, onSubmit, onPrev }) => {
    const editor = useRef(null);

    return (
        <Box sx={{ width: "100%", height: 550, borderRadius: 1, padding: 2 }}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel>Summary</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={userForm.summary}
                            onChange={(value) =>
                                setUserForm((prev) => ({
                                    ...prev,
                                    summary: value,
                                }))
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <FormLabel>About</FormLabel>
                        <JoditEditor
                            ref={editor}
                            value={userForm.about}
                            onChange={(value) =>
                                setUserForm((prev) => ({
                                    ...prev,
                                    about: value,
                                }))
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Button variant="contained" color="primary" onClick={onPrev}>
                    PREV
                </Button>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default PersonalInfo;
