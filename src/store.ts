// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './AuthApi';
import { bookingsApi } from './components/DashBoards/UserDashBoard/Slices/bookingsApi';
import bookingsReducer from './components/DashBoards/UserDashBoard/Slices/bookingsSlice';
import { vehiclesApi } from './components/DashBoards/UserDashBoard/Slices/apislice';
import { ticketsApi } from './components/DashBoards/UserDashBoard/Slices/ticketsapi'; // Adjust the path as needed


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer, // Add ticketsApi reducer
    bookings: bookingsReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, bookingsApi.middleware, vehiclesApi.middleware, ticketsApi.middleware), // Add ticketsApi middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
