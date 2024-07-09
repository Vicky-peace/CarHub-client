// CustomDrawer.tsx
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose }) => {
  const history = useHistory();

  const navigateTo = (path: string) => {
    history.push(path);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={() => navigateTo('/support/dashboard')}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => navigateTo('/support/book-vehicle')}>
          <ListItemText primary="Book a Vehicle" />
        </ListItem>
        <ListItem button onClick={() => navigateTo('/support/booked-vehicles')}>
          <ListItemText primary="Booked Vehicles" />
        </ListItem>
        <ListItem button onClick={() => navigateTo('/support/my-tickets')}>
          <ListItemText primary="My Tickets" />
        </ListItem>
        <ListItem button onClick={() => navigateTo('/support/new-ticket')}>
          <ListItemText primary="New Ticket" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
