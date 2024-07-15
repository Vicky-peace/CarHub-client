import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { useFetchFleetQuery } from './Slices/fleetapi';

const FleetManagement: React.FC = () => {
  const { data: fleet, error, isLoading } = useFetchFleetQuery();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Fleet Management</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error loading fleet</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Acquisition Date</TableCell>
                <TableCell>Maintenance Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fleet?.map((fleetItem) => (
                <TableRow key={fleetItem.id}>
                  <TableCell>{fleetItem.id}</TableCell>
                  <TableCell>{fleetItem.vehicleId}</TableCell>
                  <TableCell>{fleetItem.acquisitionDate}</TableCell>
                  <TableCell>{fleetItem.maintenanceStatus}</TableCell>
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

export default FleetManagement;
