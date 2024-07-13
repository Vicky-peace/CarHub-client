import React from 'react';
import { Card, CardContent, Typography, Button, CardActions, styled } from '@mui/material';
import { CarCardProps } from './types';
import carImage from '../../../../assets/images/car image.webp';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import LocationOnIcon
import DateRangeIcon from '@mui/icons-material/DateRange'; // Import DateRangeIcon

const StyledCard = styled(Card)({
  maxWidth: 345,
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
});

const CardMedia = styled('img')({
  height: 140,
  objectFit: 'cover',
});

const CarCard: React.FC<CarCardProps> = ({ vehicle_image, rental_rate, availability, vehicleSpec, onBookClick }) => {
  return (
    <StyledCard variant="outlined">
      <CardMedia src={vehicle_image || carImage} alt={vehicleSpec ? `${vehicleSpec.manufacturer} ${vehicleSpec.model}` : 'Vehicle'} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {vehicleSpec ? `${vehicleSpec.manufacturer} ${vehicleSpec.model}` : 'Unknown Vehicle'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rental Rate: {rental_rate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Availability: {availability}
        </Typography>
        {vehicleSpec && (
          <>
            <Typography variant="body2" color="text.secondary">
              Year: {vehicleSpec.year}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fuel Type: {vehicleSpec.fuel_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Engine Capacity: {vehicleSpec.engine_capacity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Transmission: {vehicleSpec.transmission}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Seating Capacity: {vehicleSpec.seating_capacity}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Color: {vehicleSpec.color}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Features: {vehicleSpec.features}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onBookClick}>
          Book
        </Button>
        <LocationOnIcon /> {/* Example usage of LocationOnIcon */}
        <DateRangeIcon /> {/* Example usage of DateRangeIcon */}
      </CardActions>
    </StyledCard>
  );
};

export default CarCard;
