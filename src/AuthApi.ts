// src/api/authApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

type UseLoginMutation = typeof authApi.endpoints.login.useMutation;
type UseRegisterMutation = typeof authApi.endpoints.register.useMutation;

export const useLoginMutation: UseLoginMutation = authApi.endpoints.login.useMutation;
export const useRegisterMutation: UseRegisterMutation = authApi.endpoints.register.useMutation;
