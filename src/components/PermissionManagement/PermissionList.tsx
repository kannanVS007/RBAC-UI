import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import PermissionForm from './PermissionForm';
import { fetchPermissions, addPermission, updatePermission, deletePermission } from '../../services/mockApi';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

const PermissionList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const data = await fetchPermissions();
      setPermissions(data);
    } catch (error) {
      showSnackbar('Failed to load permissions', 'error');
    }
  };

  const handleAdd = async (permission: Omit<Permission, 'id'>) => {
    try {
      const newPermission = { ...permission, id: Date.now().toString() };
      await addPermission(newPermission);
      await loadPermissions();
      showSnackbar('Permission added successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to add permission', 'error');
    }
  };

  const handleEdit = async (permission: Permission) => {
    try {
      await updatePermission(permission);
      await loadPermissions();
      showSnackbar('Permission updated successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to update permission', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePermission(id);
      await loadPermissions();
      showSnackbar('Permission deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to delete permission', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Mobile/Tablet Card View Component
  const PermissionCard = ({ permission }: { permission: Permission }) => (
    <Card sx={{ mb: 2, width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {permission.name}
          </Typography>
          <Box>
            <IconButton
              size="small"
              onClick={() => {
                setSelectedPermission(permission);
                setOpenForm(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => handleDelete(permission.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography color="textSecondary" sx={{ mb: 1, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Module: {permission.module}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          {permission.description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      maxWidth: '100%',
    }}>
      {/* Header Section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', sm: 'center' },
        mb: 3,
        gap: 2
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            mb: { xs: 1, sm: 0 }
          }}
        >
          Permissions Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedPermission(null);
            setOpenForm(true);
          }}
          fullWidth={isMobile}
          sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
        >
          Add Permission
        </Button>
      </Box>

      {/* Content Section */}
      {(isMobile || isTablet) ? (
        // Mobile & Tablet View
        <Box sx={{ width: '100%' }}>
          {permissions.map((permission) => (
            <PermissionCard key={permission.id} permission={permission} />
          ))}
        </Box>
      ) : (
        // Desktop View
        <TableContainer 
          component={Paper} 
          sx={{ 
            overflowX: 'auto',
            width: '100%',
            boxShadow: 3
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', width: '25%' }}>Name</TableCell>
                <TableCell sx={{ color: 'white', width: '35%' }}>Description</TableCell>
                <TableCell sx={{ color: 'white', width: '25%' }}>Module</TableCell>
                <TableCell sx={{ color: 'white', width: '15%' }} align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell>{permission.module}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        setSelectedPermission(permission);
                        setOpenForm(true);
                      }}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(permission.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Permission Form Modal */}
      <PermissionForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={(formData) => {
          if (selectedPermission) {
            handleEdit({ ...formData, id: selectedPermission.id });
          } else {
            handleAdd(formData);
          }
          setOpenForm(false);
        }}
        initialData={selectedPermission || { name: '', description: '', module: '' }}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 'auto' }
        }}
      >
        <Alert 
          severity={snackbar.severity} 
          elevation={6} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PermissionList;