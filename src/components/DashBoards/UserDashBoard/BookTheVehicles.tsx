import React, { useState, useEffect } from 'react';
import { CarCardProps } from './Slices/types';
import CarCard from './Slices/carcard';
import { useGetCombinedVehiclesWithSpecificationsQuery } from './Slices/apislice';
import { ClipLoader } from 'react-spinners';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box,
  Snackbar, 
} from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';
import carImage from '../../../assets/images/car image.webp';
import { styled } from '@mui/system';
import { locationApi } from './LOCATION';

const StyledCarCard = styled('div')(() => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
}));

const VehicleList: React.FC = () => {
  const { data: locations } = locationApi.useGetLocationsQuery();
  console.log(locations);
  const { data: combinedData, error, isLoading } = useGetCombinedVehiclesWithSpecificationsQuery();
  const [selectedVehicle, setSelectedVehicle] = useState<CarCardProps | null>(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>(''); 
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

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
    setBookingDate('');
    setReturnDate('');
    setLocationId(undefined); 
    setTotalAmount(null);
  };

  const calculateNumberOfDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return Math.ceil(daysDiff); // Use Math.ceil to round up to the nearest whole number
  };

  useEffect(() => {
    if (selectedVehicle && bookingDate && returnDate) {
      const numberOfDays = calculateNumberOfDays(bookingDate, returnDate);
      const total = selectedVehicle.rental_rate * numberOfDays;
      setTotalAmount(total);
    } else {
      setTotalAmount(null);
    }
  }, [selectedVehicle, bookingDate, returnDate]);

  const handleBookingSubmit = async () => {
    setBookingError(null);

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.user_id;
    console.log('User ID:', userId);

    if (!userId) {
      setBookingError('User ID not found in localStorage');
      return;
    }

    if (!selectedVehicle) {
      setBookingError('Please select a vehicle.');
      return;
    }

    if (locationId === undefined || isNaN(locationId)) {
      setBookingError('Please select a valid location.');
      return;
    }

    if (!bookingDate || !returnDate) {
      setBookingError('Please select both pickup and return dates.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          vehicle_id: Number(selectedVehicle.vehicle_id),
          booking_date: formatDate(bookingDate), 
          return_date: formatDate(returnDate), 
          location_id: Number(locationId), 
          total_amount: totalAmount
        }),
      });

      console.log('Response:', response);
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to book vehicle');
      }

      setBookingSuccess(true);
      handleCloseBookingForm();
    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setBookingError(error.message || 'Failed to book vehicle');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
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
              <TextField
                fullWidth
                label="Booking Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                fullWidth
                label="Return Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                <select
                  value={locationId || ''}
                  onChange={(e) => setLocationId(e.target.value !== '' ? Number(e.target.value) : undefined)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a location</option>
                  {locations?.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              {totalAmount !== null && (
                <TextField
                  fullWidth
                  label="Total Amount"
                  value={totalAmount}
                  InputProps={{ readOnly: true }}
                  style={{ marginBottom: '10px' }}
                />
              )}
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
