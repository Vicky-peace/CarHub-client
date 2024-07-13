import React, { useState, useEffect } from 'react';
import { CarCardProps } from './Slices/types';
import CarCard from './Slices/carcard';
import { useGetCombinedVehiclesWithSpecificationsQuery } from './Slices/apislice';
import { ClipLoader } from 'react-spinners';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import carImage from '../../../assets/images/car image.webp';
import { styled } from '@mui/system'; 

const StyledCarCard = styled('div')(({ theme }) => ({
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
  const [bookingSuccess, setBookingSuccess] = useState(false); // State to track booking success
  const [bookingError, setBookingError] = useState<string | null>(null); // State to track booking error
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
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
    setSelectedVehicle(vehicle);
    setBookingFormOpen(true);
  };

  const handleCloseBookingForm = () => {
    setBookingFormOpen(false);
    setSelectedVehicle(null);
    setBookingError(null); // Clear any previous error
    setPickupDate('');
    setReturnDate('');
    setSelectedLocation('');
  };

  const handleBookingSubmit = async () => {
    setBookingError(null); // Clear previous errors
    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: selectedVehicle?.vehicle_id,
          pickupDate,
          returnDate,
          locationId: selectedLocation, // Include selected location ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book vehicle'); // Handle non-200 responses
      }

      setBookingSuccess(true);

      handleCloseBookingForm();
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setBookingError(error.message || 'Failed to book vehicle'); // Set error message
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
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
              <Typography variant="h6" gutterBottom>
                {selectedVehicle.vehicleSpec?.manufacturer} {selectedVehicle.vehicleSpec?.model}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Rental Rate: {selectedVehicle.rental_rate}
              </Typography>
              <Typography variant="body2">Year: {selectedVehicle.vehicleSpec?.year}</Typography>
              <Typography variant="body2">Fuel Type: {selectedVehicle.vehicleSpec?.fuel_type}</Typography>
              <Typography variant="body2">Engine Capacity: {selectedVehicle.vehicleSpec?.engine_capacity}</Typography>
              <Typography variant="body2">Transmission: {selectedVehicle.vehicleSpec?.transmission}</Typography>
              <Typography variant="body2">Seating Capacity: {selectedVehicle.vehicleSpec?.seating_capacity}</Typography>
              <Typography variant="body2">Color: {selectedVehicle.vehicleSpec?.color}</Typography>
              <Typography variant="body2">Features: {selectedVehicle.vehicleSpec?.features}</Typography>
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <InputLabel id="location-label">Location</InputLabel>
                <Select
                  labelId="location-label"
                  id="location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value as string)}
                >
                  {locations.map((location: any) => (
                    <MenuItem key={location.location_id} value={location.location_id}>
                      {location.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                label="Pickup Date"
                fullWidth
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                style={{ marginTop: '10px' }}
              />
              <TextField
                margin="dense"
                label="Return Date"
                fullWidth
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                style={{ marginTop: '10px' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingForm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBookingSubmit} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={bookingSuccess}
        autoHideDuration={6000}
        onClose={() => setBookingSuccess(false)}
        message="Booking Successful"
        action={
          <React.Fragment>
            <CheckCircle sx={{ color: 'green' }} />
          </React.Fragment>
        }
        style={{ marginBottom: '20px' }}
      />

      <Snackbar
        open={!!bookingError}
        autoHideDuration={6000}
        onClose={() => setBookingError(null)}
        message={bookingError || 'Failed to book vehicle'}
        action={
          <React.Fragment>
            <ErrorOutline sx={{ color: 'red' }} />
          </React.Fragment>
        }
        style={{ marginBottom: '20px' }}
      />
    </div>
  );
};

export default VehicleList;
