import React, { useState, useEffect } from 'react';
import { CarCardProps } from './Slices/types';
import CarCard from './Slices/carcard';
import { useGetCombinedVehiclesWithSpecificationsQuery } from './Slices/apislice';
import { ClipLoader } from 'react-spinners';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box,
   Snackbar, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import carImage from '../../../assets/images/car image.webp';
import { styled } from '@mui/system';

const StyledCarCard = styled('div')(() => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const VehicleList: React.FC = () => {
  const { data: combinedData, error, isLoading } = useGetCombinedVehiclesWithSpecificationsQuery();
  const [selectedVehicle, setSelectedVehicle] = useState<CarCardProps | null>(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const locationsData = await response.json();
      setLocations(locationsData);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleBookButtonClick = (vehicle: CarCardProps) => {
    if (vehicle.availability) {
      setSelectedVehicle(vehicle);
      setBookingFormOpen(true);
    } else {
      setBookingError('This vehicle is not available for booking');
    }
  };

  const handleCloseBookingForm = () => {
    setBookingFormOpen(false);
    setSelectedVehicle(null);
    setBookingError(null);
    setPickupDate('');
    setReturnDate('');
    setSelectedLocation('');
  };

  const handleBookingSubmit = async () => {
    setBookingError(null);
    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: selectedVehicle?.vehicle_id,
          pickupDate,
          returnDate,
          locationId: selectedLocation,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book vehicle');
      }

      setBookingSuccess(true);

      handleCloseBookingForm();
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setBookingError(error.message || 'Failed to book vehicle');
    }
  };

  if (isLoading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#f00" size={150} />
      </div>
    );
  if (error) return <div>Error: Error Fetching</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {combinedData?.map((car: CarCardProps) => (
          <StyledCarCard key={car.vehicle_id}>
            <CarCard
              vehicle_id={car.vehicle_id}
              vehicle_image={car.vehicle_image}
              rental_rate={car.rental_rate}
              availability={car.availability}
              vehicleSpec={car.vehicleSpec}
              onBookClick={() => handleBookButtonClick(car)}
            />
          </StyledCarCard>
        ))}
      </div>

      <Dialog open={bookingFormOpen} onClose={handleCloseBookingForm}>
        <DialogTitle>Book Vehicle</DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <Box>
              <img
                src={selectedVehicle.vehicle_image || carImage}
                alt="Vehicle"
                style={{ width: '100%', height: 'auto', marginBottom: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              />
              <TextField
                fullWidth
                label="Vehicle Name"
                value={`${selectedVehicle.vehicleSpec?.manufacturer} ${selectedVehicle.vehicleSpec?.model}`}
                InputProps={{ readOnly: true }}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                fullWidth
                label="Rental Rate"
                value={selectedVehicle.rental_rate}
                InputProps={{ readOnly: true }}
                style={{ marginBottom: '10px' }}
              />
              <FormControl fullWidth style={{ marginBottom: '10px' }}>
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((location: any) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Pickup Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                fullWidth
                label="Return Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingForm} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleBookingSubmit} color="primary">
            Submit Booking
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={bookingSuccess}
        autoHideDuration={6000}
        onClose={() => setBookingSuccess(false)}
        message={
          <Box display="flex" alignItems="center">
            <CheckCircle style={{ marginRight: '10px', color: 'green' }} />
            Booking successful!
          </Box>
        }
      />
      <Snackbar
        open={Boolean(bookingError)}
        autoHideDuration={6000}
        onClose={() => setBookingError(null)}
        message={
          <Box display="flex" alignItems="center">
            <ErrorOutline style={{ marginRight: '10px', color: 'red' }} />
            {bookingError}
          </Box>
        }
      />
    </div>
  );
};

export default VehicleList;
