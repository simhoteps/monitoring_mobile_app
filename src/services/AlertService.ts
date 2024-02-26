
import {   createApi } from '@reduxjs/toolkit/query/react';
import { IAlertsData, IAlertsType, IPermmissionsData } from '../store/types';
import { baseQuery } from './BaseQuery';


export const alertsApi = createApi({
    reducerPath: 'AlertsApi',
    baseQuery: baseQuery(),
    tagTypes: ['alert'],
    endpoints: (builder) => ({
      getAlerts: builder.query<IAlertsData, { company: number, currentPage: number }>({
        query:({ company, currentPage }) => {
          return {
            url: `/customer/${company}/alerts/?page=${currentPage}`,
            method:"GET"
          }
        },
      }),
    }),
  });
  
export const { useGetAlertsQuery } = alertsApi;

