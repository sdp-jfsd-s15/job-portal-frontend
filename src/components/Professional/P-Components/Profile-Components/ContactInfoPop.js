import { format, parseISO } from 'date-fns';

const ContactInfoPop = ({ open, onClose, contactDetails = {} }) => {
    const formatBirthday = (dateString) => {
        try {
            return format(parseISO(dateString), 'dd/MM/yyyy');
        } catch {
            return 'N/A'; 
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <Typography variant="body1"><strong>Phone:</strong> {contactDetails.phone || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {contactDetails.email || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Address:</strong> {contactDetails.address || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Birthday:</strong> {contactDetails.birthday ? formatBirthday(contactDetails.birthday) : 'N/A'}</Typography>
            </DialogContent>
        </Dialog>
    );
