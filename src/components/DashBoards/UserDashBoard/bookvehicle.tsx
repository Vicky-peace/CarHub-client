import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid } from '@mui/material';

const BookVehicle: React.FC = () => {
  const [form, setForm] = useState({
    user_id: '',
    vehicle_id: '',
    location_id: '',
    booking_date: '',
    return_date: '',
    total_amount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(form);
  };

  return (
    <Container>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Book a Vehicle
        </Typography>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="location_id"
                label="Location ID"
                fullWidth
                value={form.location_id}
                onChange={handleChange}
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default BookVehicle;
