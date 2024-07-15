import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Fleet } from '../types';

const BASE_URL = 'http://localhost:8000';

export const fleetApi = createApi({
  reducerPath: 'fleetApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Fleet'],
  endpoints: (builder) => ({
    fetchFleet: builder.query<Fleet[], void>({
      query: () => 'api/fleet-management',
      providesTags: ['Fleet'],
    }),
    addFleet: builder.mutation<Fleet, Partial<Fleet>>({
      query: (newFleet) => ({
        url: 'api/fleet-management',
        method: 'POST',
        body: newFleet,
      }),
      invalidatesTags: ['Fleet'],
    }),
    // Add other fleet-related endpoints here
  }),
});

type UseFetchFleetQuery = typeof fleetApi.endpoints.fetchFleet.useQuery;
type UseAddFleetMutation = typeof fleetApi.endpoints.addFleet.useMutation;

export const useFetchFleetQuery: UseFetchFleetQuery = fleetApi.endpoints.fetchFleet.useQuery;
export const useAddFleetMutation: UseAddFleetMutation = fleetApi.endpoints.addFleet.useMutation;
