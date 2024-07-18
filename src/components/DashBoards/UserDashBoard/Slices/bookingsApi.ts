import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL='http://localhost:8000/api';


export interface Booking {
  user_id: string;
  vehicle_id: string;
  location_id: string;
  booking_date: string;
  return_date: string;
  total_amount: string;
}

export const bookingsApi = createApi({
  reducerPath: 'bookingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    fetchBookings: builder.query<Booking[], void>({
      query: () => '/bookings',
      providesTags: ['Bookings'],
    }),
    postBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (newBooking) => ({
        url: '/bookings',
        method: 'POST',
        body: newBooking,
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});


type UseFetchBookingsQuery = typeof bookingsApi.endpoints.fetchBookings.useQuery;
type UsePostBookingMutation = typeof bookingsApi.endpoints.postBooking.useMutation;


export const useFetchBookingsQuery: UseFetchBookingsQuery = bookingsApi.endpoints.fetchBookings.useQuery;
export const usePostBookingMutation: UsePostBookingMutation = bookingsApi.endpoints.postBooking.useMutation;
