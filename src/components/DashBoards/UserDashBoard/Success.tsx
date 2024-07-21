// SuccessPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    navigate('/user/dashboard'); // Change this path as needed
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h3" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your booking has been confirmed.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleReturnToDashboard}
        sx={{ marginTop: '20px' }}
      >
        Return to Dashboard
      </Button>
    </Box>
  );
};

export default SuccessPage;
