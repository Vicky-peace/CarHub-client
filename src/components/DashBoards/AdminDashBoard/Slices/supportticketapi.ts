import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SupportTicket } from '../types';

const BASE_URL = 'http://localhost:8000';

export const supportTicketsApi = createApi({
  reducerPath: 'supportTicketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['SupportTicket'],
  endpoints: (builder) => ({
    fetchSupportTickets: builder.query<SupportTicket[], void>({
      query: () => '/api/customer-support-tickets',
      providesTags: ['SupportTicket'],
    }),
    addSupportTicket: builder.mutation<SupportTicket, Partial<SupportTicket>>({
      query: (newTicket) => ({
        url: '/api/customer-support-tickets',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: ['SupportTicket'],
    }),
   
  }),
});

type UseFetchSupportTicketsQuery = typeof supportTicketsApi.endpoints.fetchSupportTickets.useQuery;
type UseAddSupportTicketMutation = typeof supportTicketsApi.endpoints.addSupportTicket.useMutation;

export const useFetchSupportTicketsQuery: UseFetchSupportTicketsQuery = supportTicketsApi.endpoints.fetchSupportTickets.useQuery;
export const useAddSupportTicketMutation: UseAddSupportTicketMutation = supportTicketsApi.endpoints.addSupportTicket.useMutation;
