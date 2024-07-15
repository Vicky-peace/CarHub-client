import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Location } from '../types';

const BASE_URL = 'http://localhost:8000';

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Location'],
  endpoints: (builder) => ({
    fetchLocations: builder.query<Location[], void>({
      query: () => '/api/locations',
      providesTags: ['Location'],
    }),
    addLocation: builder.mutation<Location, Partial<Location>>({
      query: (newLocation) => ({
        url: '/api/locations',
        method: 'POST',
        body: newLocation,
      }),
      invalidatesTags: ['Location'],
    }),
    
  }),
});

type UseFetchLocationsQuery = typeof locationsApi.endpoints.fetchLocations.useQuery;
type UseAddLocationMutation = typeof locationsApi.endpoints.addLocation.useMutation;

export const useFetchLocationsQuery: UseFetchLocationsQuery = locationsApi.endpoints.fetchLocations.useQuery;
export const useAddLocationMutation: UseAddLocationMutation = locationsApi.endpoints.addLocation.useMutation;
