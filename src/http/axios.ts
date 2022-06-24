import axios, { AxiosRequestConfig } from 'axios';
import auth from './auth';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_API_URL,
  withCredentials: true,
});

export const setCsrfTokenToHeaders = async () => {
  const { data } = await auth.getCsrfToken();
  axiosInstance.defaults.headers.post['X-CSRF-Token'] = data.csrfToken;
};

type RequestParams = Parameters<typeof axiosInstance.interceptors.request.use>;
type ResponseParams = Parameters<typeof axiosInstance.interceptors.response.use>;

const handleRefreshToken = async (config: AxiosRequestConfig) => {
  try {
    await auth.refreshToken();
    return axiosInstance(config);
  } catch (error) {
    throw error;
  }
};

// ================================== Interceptors Request ==================================
const requestFulfilled: RequestParams[0] = (config) => {
  return config;
};

const requestError: RequestParams[1] = async (error) => {
  return Promise.reject(error);
};

// ================================== Interceptors Response ==================================
const responseFulfilled: ResponseParams[0] = (config) => {
  return config;
};
const responseError: ResponseParams[1] = async (error) => {
  const config = error.config;
  const notAllowUrls = ['/auth/refreshToken', '/auth/login', '/me'];
  if (error?.response?.status === 401 && !notAllowUrls.includes(config.url)) {
    try {
      return handleRefreshToken(config);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  if (error?.response?.status === 401) {
    await auth.logout();
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(requestFulfilled, requestError);
axiosInstance.interceptors.response.use(responseFulfilled, responseError);

export default axiosInstance;
