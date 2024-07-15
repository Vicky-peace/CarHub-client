import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Button } from '@mui/material';
import { useFetchSupportTicketsQuery } from './Slices/supportticketapi';

const CustomerSupportTickets: React.FC = () => {
  const { data: tickets, error, isLoading } = useFetchSupportTicketsQuery();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4">Customer Support Tickets</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error loading support tickets</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Issue</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets?.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.userId}</TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                    <Button>Close</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CustomerSupportTickets;
