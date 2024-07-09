import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const BookedVehicles: React.FC = () => {
  // Dummy data for booked vehicles
  const bookedVehicles = [
    { id: 1, name: 'Toyota Corolla', status: 'Confirmed' },
    { id: 2, name: 'Honda Civic', status: 'Pending' },
    { id: 3, name: 'Ford Focus', status: 'Cancelled' },
  ];

  return (
    <Container>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Booked Vehicles
        </Typography>
        {bookedVehicles.map((vehicle) => (
          <Typography key={vehicle.id}>
            {vehicle.name} - {vehicle.status}
          </Typography>
        ))}
      </Paper>
    </Container>
  );
};

export default BookedVehicles;
