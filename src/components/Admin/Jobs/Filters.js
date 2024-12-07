import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  Typography,
  Chip,
} from '@mui/material';

const Filters = ({ open, onClose, filters, selectedFilters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = React.useState(() => {
    // Initialize filters as empty arrays
    const initialFilters = {};
    Object.keys(filters).forEach(filterType => {
      initialFilters[filterType] = selectedFilters[filterType] || [];
    });
    return initialFilters;
  });

  // Add or remove filter from the list
  const handleCheckboxChange = (filterType, value) => {
    setLocalFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
  
      // Ensure updatedFilters[filterType] is always an array
      if (!Array.isArray(updatedFilters[filterType])) {
        updatedFilters[filterType] = [];
      }
  
      // Toggle the selected value
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
      } else {
        updatedFilters[filterType].push(value);
      }
  
      // Clean up empty arrays
      if (updatedFilters[filterType].length === 0) {
        delete updatedFilters[filterType];
      }
  
      return updatedFilters;
    });
  };
  

  // Clear all filters
  const handleClear = () => {
    const clearedFilters = {};
    Object.keys(localFilters).forEach(filterType => {
      clearedFilters[filterType] = [];
    });
    setLocalFilters(clearedFilters);
  };

  // Apply filters and close
  const handleApply = () => {
    // Combine non-empty filter arrays
    const combinedFilters = [
      ...(localFilters.filter || []),
      ...(localFilters.skills || []),
      ...(localFilters.type || []),
      ...(localFilters.category || [])
    ];
  
    onApplyFilters(combinedFilters);  // Pass the filters as a list of strings
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Options</DialogTitle>
      <DialogContent>
        {/* Display selected filters */}
        <Box mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            Selected Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.keys(localFilters).map((filterType) =>
              localFilters[filterType].map((filterValue) => (
                <Chip
                  key={`${filterType}-${filterValue}`}
                  label={`${filterType}: ${filterValue}`}
                  onDelete={() => handleCheckboxChange(filterType, filterValue)}
                  color="primary"
                />
              ))
            )}
          </Box>
        </Box>

        {/* Render filter options */}
        {Object.keys(filters).map((filterType) => (
          <Box key={filterType} mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Typography>
            <FormGroup>
              {filters[filterType].map((filterValue) => (
                <FormControlLabel
                  key={filterValue}
                  control={
                    <Checkbox
                      checked={Array.isArray(localFilters[filterType]) && localFilters[filterType].includes(filterValue)}
                      onChange={() => handleCheckboxChange(filterType, filterValue)}
                    />
                  }
                  label={filterValue}
                />
              ))}
            </FormGroup>
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} color="secondary">
          Clear
        </Button>
        <Button onClick={handleApply} color="primary">
          Apply
        </Button>
        <Button onClick={onClose} color="default">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Filters;
