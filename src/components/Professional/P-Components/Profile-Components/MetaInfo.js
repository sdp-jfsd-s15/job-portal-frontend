import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import backgroundImageP from "../../../../images/profileBackgroundStatic.jpeg";
import ProfileImage from "../../../../images/profileImage.jpeg";
import { Button, CardActions, Link } from '@mui/material';
import ContactInfoPop from './ContactInfoPop';
import { useNavigate } from 'react-router-dom';

// Styled component for positioning the Avatar
const AvatarWrapper = styled(Box)({
    position: 'relative', // Necessary to position the avatar within the card
    display: 'flex',
    justifyContent: 'flex-start', // Align avatar to the left
});

const ProfileAvatar = styled(Avatar)({
    position: 'absolute',
    top: '-60px',  // Adjust vertical position to float above the card
    left: '16px',  // Adjust horizontal position to the left
    width: '150px',
    height: '150px',
    border: '4px solid white', // Optional: add border around avatar for contrast
});

const MetaInfo = ({ userdetails }) => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = React.useState(false);

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleConnectionClick = () => {
        const currentPath = window.location.pathname;
        let targetPath = "";
        if (currentPath.startsWith("/professional/profile")) {
            targetPath = `/professional/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`;
        } else if (currentPath.startsWith("/user/profile")) {
            targetPath = `/user/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`;
        }
        navigate(targetPath)
    }
    
    return (
        <Card sx={{ width: '100%', position: 'relative' }}>
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
            <CardActions sx={{ marginLeft: 2, marginBottom: -2 }}>
                <Link style={{ cursor: 'pointer' }} onClick={() => {handleConnectionClick()}}>
                    {userdetails.connectionsCount} Connections
                </Link>
            </CardActions>
            <CardActions sx={{ marginLeft: 1 }}>
                <Button
                    variant="contained"
                    sx={{ borderRadius: '50px', padding: '6px 24px' }}
                >
                    Open To
                </Button>
                <Button
                    variant="outlined"
                    sx={{ borderRadius: '50px', padding: '6px 24px' }}
                >
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}

export default MetaInfo;
