import { useEffect, useState } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Box,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';
import { fetchRoles, deleteRole, addRole, updateRole, Role } from '../../services/mockApi';
import RoleActionsMenu from './RoleActionsMenu';
import RoleForm from './RoleForm';
import { v4 as uuidv4 } from 'uuid';

const RoleList = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const rolesData = await fetchRoles();
      setRoles(rolesData);
      showSnackbar('Roles loaded successfully', 'success');
    } catch (error) {
      showSnackbar('Error loading roles', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleDelete = async (roleId: string) => {
    try {
      await deleteRole(roleId);
      setRoles((prev) => prev.filter((role) => role.id !== roleId));
      showSnackbar('Role deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Error deleting role', 'error');
    }
  };

  const handleSubmit = async (formData: Partial<Role>) => {
    try {
      if (selectedRole) {
        const updatedRole = { ...selectedRole, ...formData };
        await updateRole(updatedRole);
        setRoles((prev) =>
          prev.map((role) => (role.id === selectedRole.id ? updatedRole : role))
        );
        showSnackbar('Role updated successfully', 'success');
      } else {
        const newRole = { ...formData, id: uuidv4() } as Role;
        await addRole(newRole);
        setRoles((prev) => [...prev, newRole]);
        showSnackbar('Role added successfully', 'success');
      }
      handleCloseDialog();
    } catch (error) {
      showSnackbar('Error saving role', 'error');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRole(null);
  };

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setOpenDialog(true);
  };

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      <Grid item xs={12}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              Role Management
            </Typography>
            <Box>
              <Tooltip title="Refresh">
                <IconButton onClick={fetchData} disabled={isLoading}>
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                sx={{ ml: 2 }}
              >
                Add Role
              </Button>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Role Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Permissions</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role) => (
                  <TableRow
                    key={role.id}
                    sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        {role.permissions.map((permission) => (
                          <Chip
                            key={permission}
                            label={permission}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <RoleActionsMenu
                        onEdit={() => handleEditClick(role)}
                        onDelete={() => handleDelete(role.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {openDialog && (
        <RoleForm
          onSubmit={handleSubmit}
          onClose={handleCloseDialog}
          initialData={selectedRole}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default RoleList;
