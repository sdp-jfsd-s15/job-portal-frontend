import React from 'react';
import Card from '@mui/material/Card';
import { Box, CardContent, Divider, Typography, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const URLLinks = ({ userdetails }) => {
    const [copySuccess, setCopySuccess] = React.useState(false);
    const role = userdetails?.role || "default"; // Fallback to "default" if role is undefined
    const lowercaseRole = role.toLowerCase(); // Safe to use toLowerCase now
    const textToCopy = `https://jobportalsdpps18-s15-04-90053-31880.netlify.app/${lowercaseRole}/profile/${userdetails.userName}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess(true);

            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };

    return (
        <Card sx={{ width: '100%', height: '210px', position: 'relative' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        <b>Profile Language</b><br/>
                    </Typography>
                    <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
                </Box>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                    English || <b>Role:</b>{userdetails.role}
                </Typography>
                
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        <b>Public Profile and URL</b>
                    </Typography>
                    <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"} arrow>
                        <ContentCopyIcon onClick={handleCopy} />
                    </Tooltip>
                    <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
                </Box>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                    https://jobportalsdpps18-s15-04-90053-31880.netlify.app/<br />{lowercaseRole}/profile/{userdetails.userName}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default URLLinks
