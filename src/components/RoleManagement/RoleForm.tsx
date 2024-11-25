// RoleForm.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Divider,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface RoleFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  initialData?: any;
}

const defaultPermissions = [
  { name: 'Read', description: 'View resources' },
  { name: 'Write', description: 'Create and edit resources' },
  { name: 'Delete', description: 'Remove resources' },
  { name: 'Admin', description: 'Full system access' }
];

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    permissions: initialData?.permissions || [],
  });

  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        permissions: initialData.permissions,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' && value.trim()) {
      setNameError('');
    }
  };

  const handlePermissionsChange = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p: string) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      setNameError('Role name is required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog 
      open 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {initialData ? 'Edit Role' : 'Add New Role'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Role Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={Boolean(nameError)}
            helperText={nameError}
            autoFocus
          />
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Permissions
            </Typography>
            <FormGroup>
              {defaultPermissions.map(({ name, description }) => (
                <FormControlLabel
                  key={name}
                  control={
                    <Checkbox
                      checked={formData.permissions.includes(name)}
                      onChange={() => handlePermissionsChange(name)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body2">{name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {description}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? 'Save Changes' : 'Create Role'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleForm;