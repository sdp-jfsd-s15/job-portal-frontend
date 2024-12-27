import React, { useState, useEffect, useRef } from 'react';
import { IconButton, InputBase, Paper, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import API from '../../../Hooks/Api';
import { useAuth } from '../../../Token/AuthContext';

const UserSearchBar = () => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);
    const { user } = useAuth();

    const fetchUsers = async () => {
        try {
            const response = await API.get(`https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/users/searchUsers?searchKeyword=${searchText}`);
            setSuggestions(response.data.slice(0, 7)); // Limit to 7 suggestions
        } catch (error) {
            console.error('Error fetching users:', error);
            setSuggestions([]);
        }
    };

    useEffect(() => {
        // Automatically fetch suggestions when searchText has 2 or more characters
        const usersFetcher = async () => {
            if (searchText.length >= 2) {
                try {
                    const response = await API.get(`https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/users/searchUsers?searchKeyword=${searchText}`);
                    setSuggestions(response.data.slice(0, 7)); // Limit to 7 suggestions
                } catch (error) {
                    console.error('Error fetching users:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }

        }
        usersFetcher();
    }, [searchText]);

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchClick = () => {
        // Fetch users regardless of text length when search button is clicked
        fetchUsers();
    };

    const handleUserClick = (userName) => {
        if(user.username === userName) {
            setSuggestions([]);
            setSearchText("");
            navigate(`/user/profile/${userName}`);
            return;
        }
        setSearchText("");
        navigate(`/user/view-profile/${userName}`);
        setSuggestions([]); // Close the suggestions box
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setSuggestions([]); // Close suggestions box if clicking outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Box ref={wrapperRef} sx={{ position: 'relative', width: 300 }}>
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
                    onClick={handleSearchClick}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            {suggestions.length > 0 && (
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '350px',
                        maxHeight: 200,
                        overflowY: 'auto',
                        zIndex: 10,
                    }}
                >
                    <List>
                        {suggestions.map((user) => (
                            <ListItem key={user.id} disablePadding>
                                <ListItemButton onClick={() => handleUserClick(user.userName)}>
                                    <ListItemText
                                        primary={`${user.firstName} ${user.lastName}`}
                                        secondary={user.userName}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </Box>
    );
};

export default UserSearchBar;
