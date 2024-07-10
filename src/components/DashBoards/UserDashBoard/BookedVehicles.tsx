import React from 'react';

import { useGetBookingHistoryMutation } from './Slices/apislice'; 
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import { Booking } from './Slices/types'; // Adjust path as per your project structure

const BookingHistory: React.FC = () => {
  const { data: bookings, error, isLoading } = useGetBookingHistoryMutation();
 

  if (isLoading) {
    return (
      <div className="booking-history">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-history">
        <Typography variant="h6" color="error">
          Error loading data: {(error as any).message}
        </Typography>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <CheckCircleIcon color="success" />;
      case 'Pending':
        return <HourglassEmptyIcon color="warning" />;
      case 'Cancelled':
        return <CancelIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <div className="booking-history">
      <h2>Booked Vehicles</h2>
      <div className="card">
        {/* <div className="image-container">
          <img src={bookingImage} alt="Profile" className="profile-image" />
        </div> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Location ID</TableCell>
                <TableCell>Booking Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Booking Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings && bookings.map((booking: Booking) => (
                <TableRow key={booking.booking_id}>
                  <TableCell>{booking.booking_id}</TableCell>
                  <TableCell>{booking.user_id}</TableCell>
                  <TableCell>{booking.vehicle_id}</TableCell>
                  <TableCell>{booking.location_id}</TableCell>
                  <TableCell>{booking.booking_date}</TableCell>
                  <TableCell>{booking.return_date}</TableCell>
                  <TableCell>{booking.total_amount}</TableCell>
                  <TableCell>{getStatusIcon(booking.booking_status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default BookingHistory;
