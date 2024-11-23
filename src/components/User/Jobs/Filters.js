import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, FormControlLabel, Box } from '@mui/material';

const Filters = ({ open, onClose }) => {
    const [filterOptions, setFilterOptions] = React.useState({
        option1: false,
        option2: false,
        option3: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilterOptions((prev) => ({ ...prev, [name]: checked }));
    };

    const handleClear = () => {
        setFilterOptions({
            option1: false,
            option2: false,
            option3: false,
        });
    };

    const handleApply = () => {
        console.log("Applied filters:", filterOptions);
        onClose(); // Close dialog after applying filters
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filter Options</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filterOptions.option1}
                                onChange={handleCheckboxChange}
                                name="option1"
                            />
                        }
                        label="Option 1"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filterOptions.option2}
                                onChange={handleCheckboxChange}
                                name="option2"
                            />
                        }
                        label="Option 2"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filterOptions.option3}
                                onChange={handleCheckboxChange}
                                name="option3"
                            />
                        }
                        label="Option 3"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClear} color="primary">
                    Clear
                </Button>
                <Button onClick={handleApply} color="primary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Filters;
