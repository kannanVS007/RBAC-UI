import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Box
} from '@mui/material';

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface PermissionTableProps {
  role: Role;
  permissions: Permission[];
  onPermissionToggle: (roleId: string, permissionId: string) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({
  role,
  permissions,
  onPermissionToggle
}) => {
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Permissions for Role: {role.name}
      </Typography>
      
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Module</TableCell>
              <TableCell sx={{ color: 'white' }}>Permission</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">Assign</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(groupedPermissions).map((module) => (
              <React.Fragment key={module}>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="subtitle1">{module}</Typography>
                  </TableCell>
                </TableRow>
                {groupedPermissions[module].map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell />
                    <TableCell>{permission.name}</TableCell>
                    <TableCell align="right">
                      <Checkbox
                        checked={role.permissions.includes(permission.id)}
                        onChange={() => onPermissionToggle(role.id, permission.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PermissionTable;
