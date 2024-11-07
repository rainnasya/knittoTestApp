// src/services/axiosBaseQuery.ts

import axios from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosRequestConfig, AxiosError } from 'axios';

const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string }): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
