// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { clearToken, getToken } from '../utils/auth';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig` for the full list of configs
const axiosClient = axios.create({
  baseURL: 'https://mern-shopify.onrender.com',
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const token = getToken('token');
  if (token) {
    config.headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message);
      }
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      window.location.replace('/signin');
    }
    // Handle errors
    throw error;
  },
);
export default axiosClient;
