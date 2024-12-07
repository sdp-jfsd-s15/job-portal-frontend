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
        "resume": {
            fileName: "",
            fileSize: null,
            fileOpenUrl: "",
            thumbNailUrl: "",
            file: null // For the actual file to be uploaded
        },
        "profileImage": {
            fileName: "",
            fileSize: null,
            fileOpenUrl: "",
            thumbNailUrl: "",
            file: null // For the actual file to be uploaded
        },
        "backgroundImage": {
            fileName: "",
            fileSize: null,
            fileOpenUrl: "",
            thumbNailUrl: "",
            file: null // For the actual file to be uploaded
        },
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
        console.log(userForm);
        const formData = new FormData();
    
        // Append the user form data as JSON
        formData.append('userForm', JSON.stringify({
            email: userForm.email,
            userName: userForm.userName,
            firstName: userForm.firstName,
            middleName: userForm.middleName,
            lastName: userForm.lastName,
            role: userForm.role,
            gender: userForm.gender,
            summary: userForm.summary,
            about: userForm.about,
            location: userForm.location,
            contactInfo: userForm.contactInfo
        }));
    
        // Append each file with specific names to distinguish them in the backend
        if (userForm.resume.file) {
            formData.append('resumeFile', userForm.resume.file, userForm.resume.file.name);
        }
        if (userForm.profileImage.file) {
            formData.append('profileImageFile', userForm.profileImage.file, userForm.profileImage.file.name);
        }
        if (userForm.backgroundImage.file) {
            formData.append('backgroundImageFile', userForm.backgroundImage.file, userForm.backgroundImage.file.name);
        }
    
        try {
            console.log(formData)
            const url = "http://localhost:9090/v1/api/users/add";
            const response = await API.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            if (response.status === 200) {
                if (userForm.role === "PROFESSIONAL") {
                    navigate(`/professional/profile/${user.username}`);
                } else if (userForm.role === "USER") {
                    navigate(`/user/profile/${user.username}`);
                }
            }
        } catch (err) {
            console.error("Error during profile creation:", err);
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
