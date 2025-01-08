import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Link, CircularProgress } from '@mui/material';
import ContactInfoPop from './ContactInfoPop';
import AddIcon from '@mui/icons-material/Add';
import API from '../Hooks/Api';
import { useNavigate } from 'react-router-dom';

// Styled component for positioning the Avatar
const AvatarWrapper = styled(Box)`
  display: flex;
  margin-left: 20px;
  margin-top: -30px; /* Adjust positioning as needed */
`;

const ProfileAvatar = styled(Avatar)`
  width: 90px; /* Adjust size as needed */
  height: 120px;
  font-size: 2rem; /* For larger text */
  background-color: #1976d2; /* Background color for the avatar */
  color: #fff;
`;

// Modified CardMedia container
const CustomCardMedia = styled(Box)`
  position: relative;
  background-color: white; /* White background */
  height: 194px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5); /* Text shadow effect */
`;

const MetaInfo = ({ userdetails }) => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = React.useState(false);
    const [connectionStatus, setConnectionStatus] = React.useState("");
    const firstLetter = userdetails.userName ? userdetails.userName.charAt(0).toUpperCase() : '';

    const handleConnectionAdd = async () => {
        try {
            const url = 'https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/connections/addConnection';
            const formData = {
                "userName": userdetails.userName
            };
            const response = await API.post(url, formData);
            if (response.status === 200) {
                setConnectionStatus("PENDING");
            }
        } catch (er) {
            console.log(er);
        }
    };

    React.useEffect(() => {
        const checkConnection = async () => {
            try {
                const url = `https://jobportalsdpps18-s15-04-90053-31880.up.railway.app/v1/api/connections/checkConnection/${userdetails.userName}`;
                const response = await API.get(url);
                console.log(response.status);
                if (response.status === 200) {
                    setConnectionStatus("ACCEPTED");
                } else if (response.status === 202) {
                    setConnectionStatus("PENDING");
                } else if(response.status === 204){
                    setConnectionStatus("");
                }
            } catch (err) {
                console.log(err);
                setConnectionStatus("");
            }
        };
    
        // Set a timeout to delay the API call
        const timeoutId = setTimeout(() => {
            checkConnection();
        }, 1000); // Change to 3000 for 3 seconds
    
        // Cleanup timeout when component unmounts or `userdetails.userName` changes
        return () => clearTimeout(timeoutId);
    }, [userdetails.userName]);
    
    const handleConnectionClick = () => {
        const currentPath = window.location.pathname;
        let targetPath = "";

        if (currentPath.startsWith("/professional/view-profile/")) {
            targetPath = `/professional/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`;
        } else if (currentPath.startsWith("/user/view-profile/")) {
            targetPath = `/user/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`;
        }

        if (targetPath) {
            navigate(targetPath);
        } else {
            console.error("Invalid path for navigation.");
        }
        // navigate(`/professional/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`)
    }

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <CustomCardMedia>
                <Typography
                    variant="h1"
                    style={{
                        color: 'black',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Text shadow
                        fontWeight: 'bold',
                    }}
                >
                    {userdetails.firstName}
                </Typography>
            </CustomCardMedia>
            <AvatarWrapper>
                <ProfileAvatar>{firstLetter}</ProfileAvatar>
            </AvatarWrapper>
            <CardContent sx={{ marginTop: '80px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        <b>{userdetails.firstName} {userdetails.middleName} {userdetails.lastName}</b>
                    </Typography>
                    {userdetails.gender === 'Male' && (
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', ml: 1, marginBottom: 1 }}>
                            (He/ Him)
                        </Typography>
                    )}
                    {userdetails.gender === 'Female' && (
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', ml: 1, marginBottom: 1 }}>
                            (She/ Her)
                        </Typography>
                    )}
                </Box>
                <div dangerouslySetInnerHTML={{ __html: userdetails.summary }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                        {userdetails.location}
                    </Typography>
                    <Link sx={{ cursor: 'pointer' }} onClick={handleOpenPopup}>
                        Contact Info
                    </Link>
                    <ContactInfoPop open={isPopupOpen} onClose={handleClosePopup} contactDetails={userdetails.contactInfo} />
                </Box>
            </CardContent>
            <CardActions sx={{ marginLeft: 2, marginBottom: -2 }}>
                <Link style={{ cursor: 'pointer' }} onClick={() => {handleConnectionClick()}}>
                    {userdetails.connectionsCount} Connections
                </Link>
            </CardActions>
            <CardActions sx={{ marginLeft: 1 }}>
                {connectionStatus === "ACCEPTED" && (
                    <Button
                        variant="contained"
                        sx={{ borderRadius: '50px', padding: '6px 24px' }}
                        disabled
                    >
                        Connected
                    </Button>
                )}
                {connectionStatus === "PENDING" && (
                    <Button
                        variant="contained"
                        sx={{ borderRadius: '50px', padding: '6px 24px' }}
                        disabled
                    >
                        <CircularProgress size={20} sx={{ marginRight: 1, color: 'white' }} />
                        Pending
                    </Button>
                )}
                {connectionStatus === "" && (
                    <Button
                        variant="contained"
                        sx={{ borderRadius: '50px', padding: '6px 24px' }}
                        onClick={handleConnectionAdd}
                    >
                        Connect <AddIcon sx={{ marginLeft: 1, fontSize: '20px' }} />
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default MetaInfo;
