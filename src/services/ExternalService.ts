
import {   createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './BaseQuery';
import { IExternalTypes } from '../types/IExternalTypes';


export const externalApi = createApi({
    reducerPath: 'externalApi',
    baseQuery: baseQuery(),
    tagTypes: ['alert'],
    endpoints: (builder) => ({
      getExternal: builder.query<IExternalTypes, {  customerId: number }>({
        query:({ customerId  }) => {
          return {
            url: `/customer/${customerId}/`,
            method:"GET"
          }
        },
      }),
    }),
  });
  
export const { useGetExternalQuery } = externalApi;
