import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, Link } from '@mui/material';
import ContactInfoPop from './ContactInfoPop';
import { useNavigate } from 'react-router-dom';

const AvatarWrapper = styled(Box)`
  display: flex;
  margin-left: 20px;
  margin-top: -30px; /* Adjust positioning as needed */
`;

const ProfileAvatar = styled(Avatar)`
  width: 80px; /* Adjust size as needed */
  height: 80px;
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
    const firstLetter = userdetails.userName ? userdetails.userName.charAt(0).toUpperCase() : '';

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleConnectionClick = () => {
        const currentPath = window.location.pathname;
        let targetPath = "";
        if (currentPath.startsWith("/professional/profile" || userdetails.role === "PROFESSIONAL")) {
            targetPath = `/admin/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`;
        } else if (currentPath.startsWith("/user/profile") || userdetails.role === "USER") {
            targetPath = `/admin/connection-details/${userdetails.connectionsCount}/${userdetails.userName}`;
        }
        navigate(targetPath)
    }

    return (
        <Card sx={{ width: '100%', position: 'relative', overflow: 'visible' }}>
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

            <CardContent sx={{ marginTop: '50px' }}>
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
                <div
                    dangerouslySetInnerHTML={{ __html: userdetails.summary }}
                    style={{ overflow: 'auto', maxHeight: 'inherit' }}
                />
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

            <CardActions sx={{ marginLeft: 2 }}>
                <Link style={{ cursor: 'pointer' }} onClick={handleConnectionClick}>
                    {userdetails.connectionsCount} Connections
                </Link>
            </CardActions>
        </Card>

    );
}

export default MetaInfo;
