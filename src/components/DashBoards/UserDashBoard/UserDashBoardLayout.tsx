import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, CssBaseline, Box, IconButton, Menu, MenuItem, Snackbar, Alert } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MyTickets from './Mytickets';
import NewTicket from './NewTicket';
import BookedVehicles from './BookedVehicles';
import BookVehicle from './bookvehicle';

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState<ReactNode>(children);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleNavigation = (component: ReactNode) => {
    setActiveComponent(component);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
    setSuccessMessage('Logout successful'); // Show success message
    setAnchorEl(null); // Close the menu
    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSuccessMessage(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Vehicle Management System
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleNavigation(children)}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<BookVehicle />)}>
              <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
              <ListItemText primary="Book a Vehicle" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<BookedVehicles />)}>
              <ListItemIcon><ListAltIcon /></ListItemIcon>
              <ListItemText primary="Booked Vehicles" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<MyTickets />)}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="My Tickets" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation(<NewTicket />)}>
              <ListItemIcon><AddCircleIcon /></ListItemIcon>
              <ListItemText primary="New Ticket" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'transparent', p: 3 }}>
        <Toolbar />
        {activeComponent}
      </Box>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardLayout;
