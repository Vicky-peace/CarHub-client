import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CarCardProps, VehicleSpec } from './types';

const BASE_URL = 'http://localhost:8000/api';

// Define the API using createApi
export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Vehicle', 'VehicleSpecs'], // Define all tag types used in endpoints
  endpoints: (builder) => ({
    getVehicles: builder.query<CarCardProps[], void>({
      query: () => '/vehiclecombined',
      providesTags: ['Vehicle'], // Tag type for vehicles endpoint
    }),
    getVehicleSpecs: builder.query<VehicleSpec[], void>({
      query: () => '/vehiclespecs',
      providesTags: ['VehicleSpecs'], // Tag type for vehicle specs endpoint
    }),
    getCombinedVehiclesWithSpecifications: builder.query<CarCardProps[], void>({
      query: () => '/vehiclecombined',
      providesTags: ['Vehicle', 'VehicleSpecs'], // Combine tag types for caching purposes
    }),
  }),
});

// Define types for useGetVehiclesQuery, useGetVehicleSpecsQuery, and useGetCombinedVehiclesWithSpecificationsQuery
type UseGetVehiclesQuery = typeof vehiclesApi.endpoints.getVehicles.useQuery;
type UseGetVehicleSpecsQuery = typeof vehiclesApi.endpoints.getVehicleSpecs.useQuery;
type UseGetCombinedVehiclesWithSpecificationsQuery = typeof vehiclesApi.endpoints.getCombinedVehiclesWithSpecifications.useQuery;

// Export hooks with their types
export const useGetVehiclesQuery: UseGetVehiclesQuery = vehiclesApi.endpoints.getVehicles.useQuery;
export const useGetVehicleSpecsQuery: UseGetVehicleSpecsQuery = vehiclesApi.endpoints.getVehicleSpecs.useQuery;
export const useGetCombinedVehiclesWithSpecificationsQuery: UseGetCombinedVehiclesWithSpecificationsQuery =
  vehiclesApi.endpoints.getCombinedVehiclesWithSpecifications.useQuery;
