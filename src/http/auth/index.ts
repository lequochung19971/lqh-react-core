import axiosInstance from '@http/axios';
import { ApiParams } from '@http/type';

export type LoginParams = { email: string; password: string };

const login: ApiParams<LoginParams> = async (params, config = {}) => {
  try {
    const { email, password } = params || {};
    const response = await axiosInstance.post('/auth/login', { email, password }, config);
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return response;
  } catch (error) {
    throw error;
  }
};

const logout: ApiParams = async (params, config = {}) => {
  try {
    const response = await axiosInstance.post('/auth/logout', params, config);
    localStorage.removeItem('currentUser');
    return response;
  } catch (error) {
    throw error;
  }
};

const refreshToken: ApiParams = async (params, config = {}) => {
  try {
    return await axiosInstance.post('/auth/refreshToken', params, config);
  } catch (error) {
    throw error;
  }
};

const getCsrfToken: ApiParams = async () => {
  try {
    return await axiosInstance.get('/csrfToken');
  } catch (error) {
    throw error;
  }
};

const getMe: ApiParams = async () => {
  try {
    const response = await axiosInstance.get('/me');
    localStorage.setItem('currentUser', JSON.stringify(response.data));
    return response;
  } catch (error) {
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
