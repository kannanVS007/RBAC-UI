import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1976d2, #1565c0)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#fff',
          }}
        >
          Role-Based Access Control
        </Typography>
        <Box>
          <Avatar
            alt="User"
            src="/path/to/avatar.jpg"
            sx={{
              ml: 2,
              bgcolor: '#fff',
              color: '#1976d2',
              border: '2px solid #fff',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
