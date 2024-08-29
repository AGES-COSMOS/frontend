import axios from 'axios';

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpService.interceptors.request.use((request) => {
  return request;
});
