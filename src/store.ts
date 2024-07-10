import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './AuthApi';
import { bookingsApi } from './components/DashBoards/UserDashBoard/Slices/bookingsApi'; // Adjust the path as needed
import bookingsReducer from './components/DashBoards/UserDashBoard/Slices/bookingsSlice'; // Adjust the path as needed

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    bookings: bookingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, bookingsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;