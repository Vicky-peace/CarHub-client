import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

const BASE_URL = 'http://localhost:8000';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], void>({
      query: () => '/api/users',
      providesTags: ['User'],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: 'api/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    // Add other user-related endpoints here
  }),
});

type UseFetchUsersQuery = typeof usersApi.endpoints.fetchUsers.useQuery;
type UseAddUserMutation = typeof usersApi.endpoints.addUser.useMutation;

export const useFetchUsersQuery: UseFetchUsersQuery = usersApi.endpoints.fetchUsers.useQuery;
export const useAddUserMutation: UseAddUserMutation = usersApi.endpoints.addUser.useMutation;
