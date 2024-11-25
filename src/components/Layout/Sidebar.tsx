import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import { People, Security, VerifiedUser, Settings, Help } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { text: 'Users', icon: <People />, path: '/users' },
    { text: 'Roles', icon: <VerifiedUser />, path: '/roles' },
    { text: 'Permissions', icon: <Security />, path: '/permissions' },
    { text: 'System Settings', icon: <Settings />, path: '/settings' },
    { text: 'Help & Support', icon: <Help />, path: '/help' },
  ];

  const activeStyle = {
    textDecoration: 'none',
    color: 'inherit',
    '&.active': {
      backgroundColor: '#e3f2fd',
      borderLeft: '4px solid #1565c0',
    },
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
          color: '#333',
        },
      }}
    >
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="#1976d2">
          RBAC System
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.path}
            sx={activeStyle}
          >
            <ListItemIcon sx={{ color: '#1976d2' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
