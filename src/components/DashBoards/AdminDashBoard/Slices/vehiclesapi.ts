import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Vehicle } from '../types';

const BASE_URL = 'http://localhost:8000';

export const vehiclesApii = createApi({
  reducerPath: 'vehiclesApii',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Vehicle'],
  endpoints: (builder) => ({
    fetchVehicles: builder.query<Vehicle[], void>({
      query: () => '/api/combined',
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
    updateVehicle: builder.mutation<Vehicle, { id: number; updates: Partial<Vehicle> }>({
      query: ({ id, updates }) => ({
        url: `/api/combinedUp/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Vehicle'],
    }),
    deleteVehicle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicle'],
    }),
  }),
});

type UseFetchVehiclesQuery = typeof vehiclesApii.endpoints.fetchVehicles.useQuery;
type UseAddVehicleMutation = typeof vehiclesApii.endpoints.addVehicle.useMutation;
type UseUpdateVehicleMutation = typeof vehiclesApii.endpoints.updateVehicle.useMutation;
type UseDeleteVehicleMutation = typeof vehiclesApii.endpoints.deleteVehicle.useMutation;

export const useFetchVehiclesQuery: UseFetchVehiclesQuery = vehiclesApii.endpoints.fetchVehicles.useQuery;
export const useAddVehicleMutation: UseAddVehicleMutation = vehiclesApii.endpoints.addVehicle.useMutation;
export const useUpdateVehicleMutation: UseUpdateVehicleMutation = vehiclesApii.endpoints.updateVehicle.useMutation;
export const useDeleteVehicleMutation: UseDeleteVehicleMutation = vehiclesApii.endpoints.deleteVehicle.useMutation;
