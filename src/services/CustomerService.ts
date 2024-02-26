import {   createApi } from '@reduxjs/toolkit/query/react';
import { IPermmissionsData } from '../store/types';
import { baseQuery } from './BaseQuery';


export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: baseQuery(),
    tagTypes: ['customer'],
    endpoints: (builder) => ({
      getCustomer: builder.query<IPermmissionsData[], void>({
        query:() => {
          return {
            url: "/conf/1/perms/",
            method:"GET"
          }
        },
      }),
    }),
  });
  
export const { useGetCustomerQuery } = customerApi;