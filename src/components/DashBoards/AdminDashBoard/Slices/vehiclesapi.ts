import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Vehicle } from '../types';

const BASE_URL = 'http://localhost:8000';

export const vehiclesApii = createApi({
  reducerPath: 'vehiclesApii',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Vehicle'],
  endpoints: (builder) => ({
    fetchVehicles: builder.query<Vehicle[], void>({
      query: () => '/api/vehicles',
      providesTags: ['Vehicle'],
    }),
    addVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (newVehicle) => ({
        url: '/api/vehicles',
        method: 'POST',
        body: newVehicle,
      }),
      invalidatesTags: ['Vehicle'],
    }),
  }),
});

type UseFetchVehiclesQuery = typeof vehiclesApii.endpoints.fetchVehicles.useQuery;
type UseAddVehicleMutation = typeof vehiclesApii.endpoints.addVehicle.useMutation;

export const useFetchVehiclesQuery: UseFetchVehiclesQuery = vehiclesApii.endpoints.fetchVehicles.useQuery;
export const useAddVehicleMutation: UseAddVehicleMutation = vehiclesApii.endpoints.addVehicle.useMutation;
