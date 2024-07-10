import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const data = [
  { name: 'Open', value: 10 },
  { name: 'In Progress', value: 5 },
  { name: 'Resolved', value: 15 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const vehicleData = [
  { name: 'Sedan', count: 20 },
  { name: 'SUV', count: 15 },
  { name: 'Truck', count: 10 },
  { name: 'Van', count: 8 },
  { name: 'Motorcycle', count: 12 }
];

const vehicleInOutData = [
  { name: 'Jan', 'In': 30, 'Out': 25 },
  { name: 'Feb', 'In': 35, 'Out': 30 },
  { name: 'Mar', 'In': 40, 'Out': 35 },
  { name: 'Apr', 'In': 45, 'Out': 40 },
  { name: 'May', 'In': 50, 'Out': 45 },
  { name: 'Jun', 'In': 55, 'Out': 50 },
  { name: 'Jul', 'In': 60, 'Out': 55 },
];

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Support Ticket Metrics
            </Typography>
            <PieChart width={400} height={400}>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Distribution
            </Typography>
            <BarChart width={400} height={400} data={vehicleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Bookings
            </Typography>
            <LineChart width={400} height={400} data={vehicleInOutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="In" stroke="#8884d8" />
              <Line type="monotone" dataKey="Out" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <LineChart width={400} height={400} data={vehicleInOutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="In" stroke="#8884d8" />
              <Line type="monotone" dataKey="Out" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Vehicles In and Out
            </Typography>
            <Box display="flex" alignItems="center">
              <DirectionsCarIcon style={{ fontSize: 60, marginRight: 16 }} />
              <Typography variant="h4">150</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Total Revenue
            </Typography>
            <Box display="flex" alignItems="center">
              <MonetizationOnIcon style={{ fontSize: 60, marginRight: 16 }} />
              <Typography variant="h4">$50,000</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
