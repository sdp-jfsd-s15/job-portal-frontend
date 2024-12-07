import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CircleIcon from '@mui/icons-material/Circle';
import WorkIcon from '@mui/icons-material/Work';
import EditJobDialog from './EditJobDialog';
import API from '../../../../../Hooks/Api';
import { useAuth } from '../../../../../Token/AuthContext';
import SelectJobToView from '../SelectJobToView';
import { useNavigate } from 'react-router-dom';

const IndividualJob = ({ job }) => {
  const { user } = useAuth();
  const [newVacancy, setNewVacancy] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isPublish, setIsPublish] = React.useState(job.isPublish);
  const [vacancyDialogOpen, setVacancyDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDisableJob = async () => {
    try {
      const url = `v1/api/job/disableJob?id=${job.id}&userName=${user.username}`;
      const response = await API.put(url);
      if (response.status === 200) {
        setIsPublish(false);
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to disable job:", error);
    }
  };

  const handleEnableJob = async () => {
    try {
      const url = `v1/api/job/enableJob?id=${job.id}&vacancy=${newVacancy}&userName=${user.username}`;
      const response = await API.put(url);
      if (response.status === 200) {
        setIsPublish(true);
      }
      window.location.reload();
    } catch (error) {
      console.error("Failed to enable job:", error);
    }
  };

  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // Open vacancy dialog instead of directly enabling the job
      setVacancyDialogOpen(true);
    } else {
      handleDisableJob();
    }
  };

  const handleVacancySubmit = () => {
    if (newVacancy > 0) {
      setVacancyDialogOpen(false); // Close the dialog
      handleEnableJob();
    } else {
      alert('Please enter a valid vacancy number.');
    }
  };

  const handleVacancyDialogClose = () => {
    setVacancyDialogOpen(false);
    setIsPublish(false); // Reset the switch to reflect the canceled action
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleUpdate = async (updatedJob) => {
    console.log('Updated Job:', updatedJob);
    try {
      const url = `v1/api/job/updateJob/${updatedJob.id}`;
      const response = await API.put(url, updatedJob);
      if (response.status === 200) {
        window.location.reload();
        handleCloseDialog();
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleViewApplicants = (id) => {
    navigate(`/professional/view-applicants/${id}/${job.company}`)
  }

  const timeAgo = (inputDate) => {
    const now = new Date();
    const past = new Date(inputDate);

    const diffInMilliseconds = now - past;
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        sx={{
          marginRight: 10,
          marginTop: 0,
          top: 0,
          left: 0,
          // width: 400, // Adjust the width of the sidebar
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        {job ? (
          <Card sx={{ width: '100%', position: 'relative', boxShadow: 'none' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CorporateFareIcon sx={{ fontSize: 40, mr: 2, mb: 2 }} />
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{ marginLeft: -1, marginTop: -1 }}
                  >
                    <b>{job.company}</b>
                    <br />
                  </Typography>
                </Box>
                <EditOutlinedIcon onClick={handleOpenDialog} sx={{ cursor: 'pointer', mt: -1 }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h6'><b>{job.title}</b></Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isPublish}
                      onChange={handleSwitchChange}
                      name="publishSwitch"
                      color="primary"
                    />
                  }
                  label={isPublish ? "Active" : "Inactive"}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {job.location}{' '}
                <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}
                <span style={{ color: 'blue' }}>{timeAgo(job.createdAt)}</span>
                <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}
                <span>{job.vacancy} vacancies</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                <WorkIcon sx={{ verticalAlign: 'middle' }} />{' '}
                <span>{job.type}</span>
              </Typography>
              <Typography variant='body1' sx={{ marginTop: 2 }}><b>Skills:</b></Typography>
              <Box component="ul" sx={{ listStyle: 'none', display: 'flex', padding: 0, margin: 0 }}>
                {job.skills.map((skill, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      marginRight: 2, // Space between skills
                      '&:last-child': { marginRight: 0 }, // Remove margin for the last skill
                    }}
                  >
                    <CircleIcon sx={{ fontSize: 5, marginLeft: 0.5, marginBottom: 0.3 }} />{' '}{skill}
                  </Box>
                ))}
              </Box>
              <Typography variant='body1' sx={{ marginTop: 2 }}><b>Description:</b></Typography>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
              <Typography variant='body1' sx={{ marginTop: 2 }}><b>Qualifications:</b></Typography>
              <div dangerouslySetInnerHTML={{ __html: job.qualifications }} />
              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => {handleViewApplicants(job.id)}} // Your handler function for viewing applicants
                >
                  View Applicants
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <div><SelectJobToView /></div>
        )}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <EditJobDialog
            job={job}
            onClose={handleCloseDialog}
            onUpdate={handleUpdate}
          />
        </Dialog>
        <Dialog open={vacancyDialogOpen} onClose={handleVacancyDialogClose}>
          <DialogTitle>Set Vacancy</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the number of vacancies to enable this job.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Vacancy"
              type="number"
              fullWidth
              value={newVacancy}
              onChange={(e) => setNewVacancy(parseInt(e.target.value, 10))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleVacancyDialogClose} color="secondary">Cancel</Button>
            <Button onClick={handleVacancySubmit} color="primary">Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </React.Fragment>
  );
};

export default IndividualJob;
