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
    const [ userForm, setUserForm ] = React.useState({
        "email": user.email,
        "userName": user.username,
        "firstName":"",
        "middleName":"",
        "lastName":"",
        "role":"",
        "gender":"",
        "contactInfo":{
            "address":"",
            "birthday":"",
            "email":user.email,
            "phone":""
        },
        "resumeurl":"",
        "profilePictureUrl":"",
        "backgroundImageUrl":"",
        "summary":"",
        "about":"",
        "location":""

    })
    const handleNext = () => {
        setSelectedTab(1);
    };

    const handlePrev = () => {
        setSelectedTab(0);
    };

    const handleSubmit = async () => {
        console.log("Form Submitted", userForm);
        try{
            const url = "http://localhost:9090/v1/api/users/add";
            const response = await API.post(url, userForm);
            if(response.status === 200) {
                if(userForm.role === "PROFESSIONAL") {
                    navigate(`/professional/profile/${user.username}`)
                }
                else if(userForm.role === "USER") {
                    navigate(`/professional/profile/${user.username}`)
                }
            }

        }
        catch(err) {
            console.log(err);
        }
        // Submit the data to your server here
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
                <Box sx={{ backgroundColor: 'white', pt: 10, height: '100vh' }}>
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
                    </Tabs>
                    {selectedTab === 0 && (
                        <UserInfoForm userForm={userForm} setUserForm={setUserForm} onNext={handleNext} />
                    )}
                    {selectedTab === 1 && (
                        <ContactInfoForm userForm={userForm} setUserForm={setUserForm} onSubmit={handleSubmit} onPrev={handlePrev} />
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default CreateProfile;
