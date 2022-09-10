import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_API_URL,
  withCredentials: true,
});

const axiosBaseQuery =
  (): BaseQueryFn<AxiosRequestConfig, BaseQueryApi, AxiosError> => async (args: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance(args);
      return {
        data: response.data,
        meta: {
          headers: response.headers,
          status: response.status,
          config: response.config,
          request: response.request,
          statusText: response.statusText,
        },
      };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error,
      };
    }
  };
const baseQuery = axiosBaseQuery();
const baseQueryWithReauth: BaseQueryFn<AxiosRequestConfig, BaseQueryApi, AxiosError> = async (
  args: AxiosRequestConfig,
  api: BaseQueryApi,
  extraOptions: Object,
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.response?.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery({ url: '/auth/refreshToken', method: 'POST' }, api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      // api.dispatch(tokenReceived(refreshResult.data));

      // store the new token - or do something
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(loggedOut());
      // Do some thing when refresh fail
    }
  }
  return result;
};

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: baseQueryWithReauth,
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getSample: builder.query({ query: () => ({ url: '/query', method: 'get' }) }),
    postSample: builder.mutation({
      query: () => ({ url: '/mutation', method: 'post' }),
    }),
  }),
});

export const { useGetSampleQuery, usePostSampleMutation } = apiSlice;
