// CustomAppBar.tsx
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

interface CustomAppBarProps {
  onMenuClick: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ onMenuClick }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">User Support Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
