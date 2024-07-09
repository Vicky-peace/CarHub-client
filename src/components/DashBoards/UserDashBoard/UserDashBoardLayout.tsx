import React, { ReactNode, useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, Typography, CssBaseline, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';

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

  const handleNavigation = (component: ReactNode) => {
    setActiveComponent(component);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Vehicle Management System
          </Typography>
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
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {activeComponent}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
