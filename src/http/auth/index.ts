import Axios from '@http/axios';
import axiosInstance from '@http/axios';
import { ApiFunction } from '@http/type';

export type LoginParams = { email: string; password: string };

const login: ApiFunction<LoginParams> = async (params) => {
  const { data, config = {} } = params || {};
  try {
    const { email, password } = data || {};
    const response = await axiosInstance.post('/auth/login', { email, password }, config);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return response;
  } catch (error) {
    throw error;
  }
};

const logout: ApiFunction = async (params) => {
  const { data, config = {} } = params || {};
  try {
    const response = await axiosInstance.post('/auth/logout', data, config);
    localStorage.removeItem('currentUser');
    return response;
  } catch (error) {
    throw error;
  }
};

const refreshToken: ApiFunction = async (params) => {
  const { data, config = {} } = params || {};
  try {
    return await axiosInstance.post('/auth/refreshToken', data, config);
  } catch (error) {
    throw error;
  }
};

const getCsrfToken: ApiFunction = async () => {
  try {
    return await axiosInstance.get('/csrfToken');
  } catch (error) {
    throw error;
  }
};

const getMe: ApiFunction = async (params) => {
  const { config = {} } = params || {};
  try {
    const response = await axiosInstance.get('/me', config);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return response;
  } catch (error) {
    localStorage.removeItem('currentUser');
    throw error;
  }
};

const auth = {
  login,
  logout,
  refreshToken,
  getCsrfToken,
  getMe,
};

export default auth;
