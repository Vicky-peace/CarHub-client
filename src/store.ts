// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './AuthApi';
import { bookingsApi } from './components/DashBoards/UserDashBoard/Slices/bookingsApi';
import bookingsReducer from './components/DashBoards/UserDashBoard/Slices/bookingsSlice';
import { vehiclesApi } from './components/DashBoards/UserDashBoard/Slices/apislice';
import { ticketsApi } from './components/DashBoards/UserDashBoard/Slices/ticketsapi'; 

import { fleetApi } from './components/DashBoards/AdminDashBoard/Slices/fleetapi';
import { locationsApi } from './components/DashBoards/AdminDashBoard/Slices/locationapi';
import { supportTicketsApi } from './components/DashBoards/AdminDashBoard/Slices/supportticketapi';
import { usersApi } from './components/DashBoards/AdminDashBoard/Slices/Userapi';
import { vehiclesApii } from './components/DashBoards/AdminDashBoard/Slices/vehiclesapi';
import { locationApi } from './components/DashBoards/UserDashBoard/LOCATION';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer, 
    bookings: bookingsReducer,
    [fleetApi.reducerPath]: fleetApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [supportTicketsApi.reducerPath]: supportTicketsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [vehiclesApii.reducerPath]: vehiclesApii.reducer,
    [locationApi.reducerPath]: locationApi.reducer, // Add this line
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bookingsApi.middleware,
      vehiclesApi.middleware,
      ticketsApi.middleware,
      fleetApi.middleware,
      locationsApi.middleware,
      supportTicketsApi.middleware,
      usersApi.middleware,
      vehiclesApii.middleware,
      locationApi.middleware // Add this line
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



