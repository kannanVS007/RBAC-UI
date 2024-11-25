import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import { ContactSupport, Email, Phone } from '@mui/icons-material';

const HelpSupport: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <Email color="primary" />
          </ListItemIcon>
          <ListItemText primary="support@yourcompany.com" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Phone color="primary" />
          </ListItemIcon>
          <ListItemText primary="+1-800-123-4567" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Frequently Asked Questions
      </Typography>
      <Typography variant="body1" gutterBottom>
        Visit our <Button variant="text" color="primary">FAQ Page</Button> for answers to common questions.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Need More Help?
      </Typography>
      <Button variant="contained" color="primary" startIcon={<ContactSupport />}>
        Submit a Support Ticket
      </Button>
    </Box>
  );
};

export default HelpSupport;
