import React, { useState } from 'react';
import { IconButton, InputBase, Paper, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ConnectionsSearch = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchText(value);
        onSearch(value); // Call the onSearch function to filter the connections
    };

    return (
        <Box sx={{ position: 'relative', width: 300 }}>
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Users"
                    inputProps={{ 'aria-label': 'search users' }}
                    value={searchText}
                    onChange={handleInputChange}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default ConnectionsSearch;
