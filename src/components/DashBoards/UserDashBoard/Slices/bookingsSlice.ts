// src/components/DashBoards/UserDashBoard/Slices/bookingsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../../../../store';
import { bookingsApi } from './bookingsApi';
import { Booking } from './bookingsApi';

export interface BookingsState {
  bookings: Booking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  status: 'idle',
  error: null,
};

interface AsyncThunkConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
}

export const fetchBookingsAsync = createAsyncThunk<Booking[], void, AsyncThunkConfig>(
  'bookings/fetchBookings',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(bookingsApi.endpoints.fetchBookings.initiate());
      const data = result.data as Booking[];
      if (data) {
        return data;
      } else {
        return rejectWithValue('Failed to fetch bookings');
      }
    } catch (error) {
      return rejectWithValue('Failed to fetch bookings');
    }
  }
);

export const postBookingAsync = createAsyncThunk<Booking, Booking, AsyncThunkConfig>(
  'bookings/postBooking',
  async (newBooking, { dispatch, rejectWithValue }) => {
    try {
      const result = await dispatch(bookingsApi.endpoints.postBooking.initiate(newBooking));
      const data = result.data as Booking;
      if (data) {
        return data;
      } else {
        return rejectWithValue('Failed to post booking');
      }
    } catch (error) {
      return rejectWithValue('Failed to post booking');
    }
  }
);

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookingsAsync.fulfilled, (state, action: PayloadAction<Booking[]>) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookingsAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || null;
      })
      .addCase(postBookingAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postBookingAsync.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.status = 'succeeded';
        state.bookings.push(action.payload);
      })
      .addCase(postBookingAsync.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || null;
      });
  },
});

export const selectBookings = (state: RootState) => state.bookings.bookings;

export default bookingsSlice.reducer;
