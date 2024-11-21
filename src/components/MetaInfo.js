import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import backgroundImageP from "../images/profileBackgroundStatic.jpeg";
import ProfileImage from "../images/profileImage.jpeg";
import { Button, CardActions, Link, CircularProgress } from '@mui/material';
import ContactInfoPop from './ContactInfoPop';
import AddIcon from '@mui/icons-material/Add';
import API from '../Hooks/Api';

// Styled component for positioning the Avatar
const AvatarWrapper = styled(Box)({
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
});

const ProfileAvatar = styled(Avatar)({
    position: 'absolute',
    top: '-60px',
    left: '16px',
    width: '150px',
    height: '150px',
    border: '4px solid white',
});

const MetaInfo = ({ userdetails }) => {
    const [isPopupOpen, setPopupOpen] = React.useState(false);
    const [connectionStatus, setConnectionStatus] = React.useState("");

    const handleConnectionAdd = async () => {
        try {
            const url = '/v1/api/connections/addConnection';
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
                const url = `/v1/api/connections/checkConnection/${userdetails.userName}`;
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
        }, 2000); // Change to 3000 for 3 seconds
    
        // Cleanup timeout when component unmounts or `userdetails.userName` changes
        return () => clearTimeout(timeoutId);
    }, [userdetails.userName]);
    

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <Card sx={{ width: '100%', height: '500px', position: 'relative' }}>
            <CardMedia
                component="img"
                height="194"
                image={backgroundImageP}
                alt="Background"
            />
            <AvatarWrapper>
                <ProfileAvatar alt="Profile Image" src={ProfileImage} />
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
