import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardActions, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import car1 from '../../../images/car image.webp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const cars = [
  { id: '1', name: 'Car A', description: 'Description A', rate: 100, numberPlate: 'XYZ123', image: car1 },
  { id: '2', name: 'Car B', description: 'Description B', rate: 150, numberPlate: 'ABC456', image: car1 },
  { id: '3', name: 'Car C', description: 'Description C', rate: 200, numberPlate: 'DEF789', image: car1 },
  { id: '4', name: 'Car D', description: 'Description D', rate: 250, numberPlate: 'GHI012', image: car1 },
  { id: '5', name: 'Car E', description: 'Description E', rate: 300, numberPlate: 'JKL345', image: car1 },
  { id: '6', name: 'Car F', description: 'Description F', rate: 350, numberPlate: 'MNO678', image: car1 },
  { id: '7', name: 'Car G', description: 'Description G', rate: 400, numberPlate: 'PQR901', image: car1 },
  { id: '8', name: 'Car H', description: 'Description H', rate: 450, numberPlate: 'STU234', image: car1 },
];

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardMedia: {
    height: 150,
    objectFit: 'cover',
  },
  cardContent: {
    flexGrow: 1,
  },
});

const BookVehicle: React.FC = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    user_id: '',
    vehicle_id: '',
    location_id: '',
    booking_date: '',
    return_date: '',
    total_amount: '',
  });
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null); // Corrected variable name
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate an asynchronous operation (e.g., API call) here
    setTimeout(() => {
      console.log(form); // Handle form submission logic here
      setLoading(false);
      // Reset form state or perform other actions after submission
    }, 2000); // Simulating a 2-second delay
  };

  const handleBook = (carId: string) => {
    setSelectedCarId(carId); // Corrected setter function
    setForm((prev) => ({ ...prev, vehicle_id: carId }));
  };

  useEffect(() => {
    if (!selectedCarId) {
      setForm({
        user_id: '',
        vehicle_id: '',
        location_id: '',
        booking_date: '',
        return_date: '',
        total_amount: '',
      });
    }
  }, [selectedCarId]);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Book a Vehicle
      </Typography>
      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={car.image}
                alt={car.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">{car.name}</Typography>
                <Typography>Description: {car.description}</Typography>
                <Typography>Rate: ${car.rate}/day</Typography>
                <Typography>Number Plate: {car.numberPlate}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBook(car.id)}
                >
                  Book
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedCarId && (
        <Dialog open={!!selectedCarId} onClose={() => setSelectedCarId(null)} aria-labelledby="booking-dialog-title">
          <DialogTitle id="booking-dialog-title">Booking Form</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="user_id"
                    label="User ID"
                    fullWidth
                    value={form.user_id}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="vehicle_id"
                    label="Vehicle ID"
                    fullWidth
                    value={form.vehicle_id}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <MonetizationOnIcon color="action" />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="location_id"
                    label="Location ID"
                    fullWidth
                    value={form.location_id}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                      startAdornment: (
                        <LocationOnIcon color="action" />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="booking_date"
                    label="Booking Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={form.booking_date}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                      startAdornment: (
                        <DateRangeIcon color="action" />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="return_date"
                    label="Return Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={form.return_date}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                      startAdornment: (
                        <DateRangeIcon color="action" />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="total_amount"
                    label="Total Amount"
                    type="number"
                    fullWidth
                    value={form.total_amount}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: false,
                      startAdornment: (
                        <MonetizationOnIcon color="action" />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default BookVehicle;
