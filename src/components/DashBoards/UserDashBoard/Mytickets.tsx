// import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const MyTickets = () => {
  // Dummy data
  const tickets = [
    { id: 1, subject: 'Issue A', status: 'Open' },
    { id: 2, subject: 'Issue B', status: 'In Progress' },
    { id: 3, subject: 'Issue C', status: 'Resolved' },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Tickets
      </Typography>
      <List>
        {tickets.map(ticket => (
          <ListItem key={ticket.id}>
            <ListItemText primary={ticket.subject} secondary={`Status: ${ticket.status}`} />
            <Button variant="contained" color="primary">View</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MyTickets;
