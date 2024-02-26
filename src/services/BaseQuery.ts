import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/base/BaseUrl';
import { RootState } from '../store/Store';
;


export const baseQuery = () => fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).main.token
      if (token ) {
          headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
  },
  credentials: 'include',
})
