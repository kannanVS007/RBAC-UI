import React from 'react';
import { Box, Typography, Divider, TextField, Button } from '@mui/material';

const SystemSettings: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box component="form" sx={{ display: 'grid', gap: 2, maxWidth: '100%', margin: '0 auto' }}>
        <TextField label="Site Name" variant="outlined" fullWidth />
        <TextField label="Admin Email" variant="outlined" fullWidth />
        <TextField label="Default Language" variant="outlined" fullWidth />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default SystemSettings;
