import * as React from 'react';
import DrawerAppBar from './CreateNav';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import UserInfoForm from './ProfileCreation/UserInfoForm';
import ContactInfoForm from './ProfileCreation/ContactInfoForm';
import { useAuth } from '../Token/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../Hooks/Api';
import PersonalInfo from './ProfileCreation/PersonalInfo';

function samePageLinkNavigation(event) {
    if (
        event.defaultPrevented ||
        event.button !== 0 || // ignore everything but left-click
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
    ) {
        return false;
    }
    return true;
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                if (samePageLinkNavigation(event)) {
                    event.preventDefault();
                }
            }}
            aria-current={props.selected ? 'page' : undefined}
            {...props}
        />
    );
}

LinkTab.propTypes = {
    selected: PropTypes.bool,
};

const CreateProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedTab, setSelectedTab] = React.useState(0); // 0 for "Grow", 1 for "Catch up"
    const [userForm, setUserForm] = React.useState({
        "email": user.email,
        "userName": user.username,
        "firstName": "",
        "middleName": "",
        "lastName": "",
        "role": "",
        "gender": "",
        "contactInfo": {
            "address": "",
            "birthday": "",
            "email": user.email,
            "phone": ""
        },
        "resume": "",
        "summary": "",
        "about": "",
        "location": ""

    })
    const handleNext = () => {
        if (selectedTab < 2) { // Adjust this number to the total tabs - 1
            setSelectedTab((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (selectedTab > 0) {
            setSelectedTab((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        console.log(userForm);
        delete userForm.contactInfo.country;
        delete userForm.contactInfo.state;
        delete userForm.contactInfo.resume;
    
        try {
            console.log(userForm)
            const url = 'http://localhost:9090/v1/api/users/add';
            const response = await API.post(url, userForm)
    
            if (response.status === 200) {
                if (userForm.role === 'PROFESSIONAL') {
                    navigate(`/professional/profile/${userForm.userName}`);
                } else if (userForm.role === 'USER') {
                    navigate(`/user/profile/${userForm.userName}`);
                }
            }
        } catch (err) {
            console.error('Error during profile creation:', err);
        }
    };
    
    
    // Handle tab change
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <DrawerAppBar />
            <Container maxWidth="lg">
                <Box sx={{ backgroundColor: 'white', pt: 10 }}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                        role="navigation"
                        sx={{
                            '& .MuiTab-root': { color: '#000' },
                            '& .Mui-selected': { color: '#073a8c' },
                        }}
                    >

                        <LinkTab label="User Info" />
                        <LinkTab label="Contact Info" />
                        <LinkTab label="Personal Info" />
                    </Tabs>
                    {selectedTab === 0 && (
                        <UserInfoForm userForm={userForm} setUserForm={setUserForm} onNext={handleNext} />
                    )}
                    {selectedTab === 1 && (
                        <ContactInfoForm userForm={userForm} setUserForm={setUserForm} onNext={handleNext} onPrev={handlePrev} />
                    )}
                    {selectedTab === 2 && (
                        <PersonalInfo userForm={userForm} setUserForm={setUserForm} onSubmit={handleSubmit} onPrev={handlePrev} />
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default CreateProfile;
