import React, { useState, useEffect } from 'react';
import {
  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  Dialog, DialogActions, DialogContent, TextField, Snackbar, Alert, CircularProgress
} from '@mui/material';
import {
  useFetchVehiclesQuery, useAddVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation
} from './Slices/vehiclesapi'; // Adjust import as necessary
import { Vehicle } from './types';

const ManageVehicles: React.FC = () => {
  const { data: vehicles, error, isLoading: isVehiclesLoading, refetch } = useFetchVehiclesQuery();
  const [addVehicle, { isLoading: isAddVehicleLoading }] = useAddVehicleMutation();
  const [updateVehicle, { isLoading: isUpdateVehicleLoading }] = useUpdateVehicleMutation();
  const [deleteVehicle, { isLoading: isDeleteVehicleLoading }] = useDeleteVehicleMutation();

  const [open, setOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = (vehicle?: Vehicle) => {
    if (vehicle) {
      setEditingVehicle(vehicle); // Set the editing vehicle to the selected vehicle
    } else {
      // Initialize a new vehicle object for adding
      setEditingVehicle({
        vehicle_id: 0,
        vehicleSpec_id: null,
        rental_rate: '0',
        availability: false,
        created_at: null,
        updated_at: null,
        vehicleSpec: {
          manufacturer: '',
          model: '',
          year: new Date().getFullYear(),
          fuel_type: '',
          engine_capacity: null,
          transmission: null,
          seating_capacity: null,
          color: null,
          features: null,
        }
      });
    }
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog
    setEditingVehicle(null); // Clear the editing vehicle state
  };

  const handleSave = async () => {
    if (editingVehicle) {
      setLoading(true);
      try {
        let saveResult;
        if (editingVehicle.vehicle_id !== undefined && editingVehicle.vehicle_id !== 0) {
          // Editing existing vehicle
          saveResult = await updateVehicle({
            id: editingVehicle.vehicle_id,
            updates: editingVehicle
          }).unwrap();
          setSnackbarMessage('Vehicle updated successfully!');
        } else {
          // Adding new vehicle
          saveResult = await addVehicle(editingVehicle).unwrap();
          setSnackbarMessage('Vehicle added successfully!');
        }

        if (saveResult.error) {
          setSnackbarMessage(saveResult.error); // Set error message if saveResult has error
        }

        setSnackbarOpen(true); // Open snackbar
        handleClose(); // Close dialog
        await refetch(); // Refetch vehicles list
      } catch (error: any) {
        console.error('Failed to save vehicle:', error);
        setSnackbarMessage('Failed to save vehicle');
        setSnackbarOpen(true); // Open snackbar for error
      } finally {
        setLoading(false); // Stop loading indicator
      }
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteVehicle(id).unwrap();
      setSnackbarMessage('Vehicle deleted successfully!');
      setSnackbarOpen(true); // Open snackbar
      await refetch(); // Refetch vehicles list
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      setSnackbarMessage('Failed to delete vehicle');
      setSnackbarOpen(true); // Open snackbar for error
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    refetch(); // Fetch vehicles on component mount and when dependencies change
  }, [refetch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Vehicles
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Vehicle
      </Button>
      {isVehiclesLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Failed to load vehicles</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Rental Rate</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles?.map((vehicle) => (
                <TableRow key={vehicle.vehicle_id}>
                  <TableCell>{vehicle.vehicleSpec?.manufacturer}</TableCell>
                  <TableCell>{vehicle.vehicleSpec?.model}</TableCell>
                  <TableCell>{vehicle.vehicleSpec?.year}</TableCell>
                  <TableCell>{vehicle.vehicleSpec?.fuel_type}</TableCell>
                  <TableCell>{vehicle.rental_rate}</TableCell>
                  <TableCell>{vehicle.availability ? 'Available' : 'Not Available'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{ color: 'green', borderColor: 'green', mr: 1 }}
                      onClick={() => handleOpen(vehicle)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ color: 'red', borderColor: 'red' }}
                      onClick={() => handleDelete(vehicle.vehicle_id)}
                      disabled={isDeleteVehicleLoading}
                    >
                      {isDeleteVehicleLoading ? (
                        <CircularProgress size={22} />
                      ) : (
                        'Delete'
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Manufacturer"
            fullWidth
            value={editingVehicle?.vehicleSpec?.manufacturer || ''}
            onChange={(e) => setEditingVehicle({
              ...editingVehicle!,
              vehicleSpec: {
                ...editingVehicle!.vehicleSpec!,
                manufacturer: e.target.value,
              }
            })}
          />
          <TextField
            label="Model"
            fullWidth
            value={editingVehicle?.vehicleSpec?.model || ''}
            onChange={(e) => setEditingVehicle({
              ...editingVehicle!,
              vehicleSpec: {
                ...editingVehicle!.vehicleSpec!,
                model: e.target.value,
              }
            })}
          />
          <TextField
            label="Year"
            fullWidth
            type="number"
            value={editingVehicle?.vehicleSpec?.year || ''}
            onChange={(e) => setEditingVehicle({
              ...editingVehicle!,
              vehicleSpec: {
                ...editingVehicle!.vehicleSpec!,
                year: parseInt(e.target.value) || 0,
              }
            })}
          />
          <TextField
            label="Fuel Type"
            fullWidth
            value={editingVehicle?.vehicleSpec?.fuel_type || ''}
            onChange={(e) => setEditingVehicle({
              ...editingVehicle!,
              vehicleSpec: {
                ...editingVehicle!.vehicleSpec!,
                fuel_type: e.target.value,
              }
            })}
          />
          <TextField
            label="Rental Rate"
            fullWidth
            type="number"
            value={editingVehicle?.rental_rate || ''}
            onChange={(e) => setEditingVehicle({ ...editingVehicle!, rental_rate: e.target.value })}
          />
          <TextField
            label="Availability"
            fullWidth
            select
            SelectProps={{ native: true }}
            value={editingVehicle?.availability ? 'true' : 'false'}
            onChange={(e) => setEditingVehicle({ ...editingVehicle!, availability: e.target.value === 'true' })}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading || isAddVehicleLoading || isUpdateVehicleLoading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageVehicles;
