
import {   createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './BaseQuery';
import { IMonitoringHostsData } from '../types/IMonitoringHostTypes';


export const monitoringHostsApi = createApi({
    reducerPath: 'monitoringHostsApi',
    baseQuery: baseQuery(),
    tagTypes: ['alert'],
    endpoints: (builder) => ({
        getMonitoringHosts: builder.query<IMonitoringHostsData, {  customerId: number }>({
        query:({ customerId  }) => {
          return {
            url: `/customer/${customerId}/zabbix_hosts/`,
            method:"GET"
          }
        },
      }),
    }),
  });
  
export const { useGetMonitoringHostsQuery } = monitoringHostsApi;
