import React from 'react';
import Card from '@mui/material/Card';
import { Box, CardContent, Divider, Typography, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const URLLinks = ({ userdetails }) => {
    const [copySuccess, setCopySuccess] = React.useState(false);
    const textToCopy = `http://localhost:3000/professional/profile/${userdetails.userName}`;

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
                        <b>Profile Language</b>
                    </Typography>
                    <EditOutlinedIcon sx={{ cursor: 'pointer' }} />
                </Box>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', marginRight: 1 }}>
                    English
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
                    http://localhost:3000/professional/profile/<br />{userdetails.userName}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default URLLinks