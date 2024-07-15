import React, { useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Snackbar, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useFetchLocationsQuery, useAddLocationMutation, useUpdateLocationMutation, useDeleteLocationMutation } from './Slices/locationapi';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Locations: React.FC = () => {
  const { data: locations, error, isLoading, refetch } = useFetchLocationsQuery();
  const [addLocation, { isLoading: isAddLocationLoading }] = useAddLocationMutation();
  const [updateLocation, { isLoading: isUpdateLocationLoading }] = useUpdateLocationMutation();
  const [deleteLocation, { isLoading: isDeleteLocationLoading }] = useDeleteLocationMutation();

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<any>(null); // Use appropriate type based on your location type

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const handleOpenAddDialog = () => {
    setEditingLocation(null);
    setOpenAddDialog(true);
  };

  const handleOpenEditDialog = (location: any) => {
    setEditingLocation(location);
    setOpenEditDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setEditingLocation(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingLocation(null);
  };

  const handleSaveLocation = async () => {
    try {
      if (editingLocation) {
        if (editingLocation.location_id) {
          await updateLocation(editingLocation).unwrap();
          setSnackbarMessage('Location updated successfully');
        } else {
          await addLocation(editingLocation).unwrap();
          setSnackbarMessage('Location added successfully');
        }
        setSeverity('success');
        setSnackbarOpen(true);
        await refetch();
        handleCloseAddDialog();
        handleCloseEditDialog();
      }
    } catch (error) {
      console.error('Failed to save location:', error);
      setSnackbarMessage('Failed to save location');
      setSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    try {
      await deleteLocation(locationId).unwrap();
      setSnackbarMessage('Location deleted successfully');
      setSeverity('success');
      setSnackbarOpen(true);
      await refetch();
    } catch (error) {
      console.error('Failed to delete location:', error);
      setSnackbarMessage('Failed to delete location');
      setSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Manage Locations</Typography>
      <Button variant="contained" color="primary" sx={{ my: 2 }} onClick={handleOpenAddDialog} disabled={isLoading}>
        Add Location
      </Button>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error loading locations</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations?.map((location: any) => (
                <TableRow key={location.location_id}>
                  <TableCell>{location.location_id}</TableCell>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.contact_phone}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenEditDialog(location)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDeleteLocation(location.location_id)} disabled={isDeleteLocationLoading}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Location Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingLocation?.name || ''}
            onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Phone"
            fullWidth
            value={editingLocation?.contact_phone || ''}
            onChange={(e) => setEditingLocation({ ...editingLocation, contact_phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={editingLocation?.address || ''}
            onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary" disabled={isAddLocationLoading}>Cancel</Button>
          <Button onClick={handleSaveLocation} color="primary" disabled={isAddLocationLoading}>
            {isAddLocationLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Location Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editingLocation?.name || ''}
            onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Contact Phone"
            fullWidth
            value={editingLocation?.contact_phone || ''}
            onChange={(e) => setEditingLocation({ ...editingLocation, contact_phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={editingLocation?.address || ''}
            onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary" disabled={isUpdateLocationLoading}>Cancel</Button>
          <Button onClick={handleSaveLocation} color="primary" disabled={isUpdateLocationLoading}>
            {isUpdateLocationLoading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Locations;
