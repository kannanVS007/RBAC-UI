import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import UserManagement from './components/UserManagement/UserList';
import RoleManagement from './components/RoleManagement/RoleList';
import PermissionList from './components/PermissionManagement/PermissionList';
import SystemSettings from './components/SystemSettings';
import HelpSupport from './components/HelpSupport';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Sidebar />
        <main style={{ padding: '16px', marginLeft: '240px', marginTop: '64px' }}>
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionList />} />
            <Route path="/settings" element={<SystemSettings />} />
            <Route path="/help" element={<HelpSupport />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
