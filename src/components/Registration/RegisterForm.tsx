import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, IconButton, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRegisterMutation } from '../../AuthApi'; // Ensure the correct path to your authApi
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const full_name = data.get('full_name') as string;
    const contact_phone = data.get('contact_phone') as string;
    const address = data.get('address') as string;

    try {
      const response = await register({ username, email, password, full_name, contact_phone, address }).unwrap();
      const { token } = response;

      localStorage.setItem('token', token);
      setRegistrationSuccessful(true); // Set registration success state

      // Redirect to login form after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ boxShadow: 3, padding: 4, borderRadius: 8 }}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {!registrationSuccessful ? (
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoComplete="given-name" name="full_name" required fullWidth id="full_name" label="Full Name" autoFocus />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="contact_phone" label="Contact Phone" name="contact_phone" autoComplete="tel" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="address" label="Address" name="address" autoComplete="address" />
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="username" name="username" required fullWidth id="username" label="Username" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />} label="I want to receive inspiration, marketing promotions and updates via email." />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Registration Successful
              </Typography>
              <IconButton style={{ color: green[500] }}>
                <CheckCircleIcon fontSize="large" />
              </IconButton>
              <Typography variant="body2" color="textSecondary">
                You can now login with your credentials.
              </Typography>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
