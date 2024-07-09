import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const NewTicket = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        New Ticket
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="Subject" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Description" multiline rows={4} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Submit Ticket</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default NewTicket;
