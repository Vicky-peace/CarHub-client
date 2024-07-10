// src/api/apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Booking } from './types'; // Adjust path as per your project structure

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }), // Replace with your actual base URL
  endpoints: (builder) => ({
    getBookingHistory: builder.query<Booking[], void>({
      query: () => 'api/vehicles', 
    }),
  }),
});

type useGetBookingHistoryMutation = typeof apiSlice.endpoints.getBookingHistory.useQuery

export const useGetBookingHistoryMutation: useGetBookingHistoryMutation = apiSlice.endpoints.getBookingHistory.useQuery;

