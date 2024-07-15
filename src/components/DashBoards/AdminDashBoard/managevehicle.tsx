import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useFetchVehiclesQuery } from './Slices/vehiclesapi';

const ManageVehicles: React.FC = () => {
  const { data: vehicles, error, isLoading } = useFetchVehiclesQuery();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Manage Vehicles</Typography>
      <Button variant="contained" color="primary" sx={{ my: 2 }}>Add Vehicle</Button>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error loading vehicles</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles?.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.id}</TableCell>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.category}</TableCell>
                  <TableCell>{vehicle.rate}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManageVehicles;
