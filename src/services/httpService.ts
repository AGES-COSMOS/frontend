import axios from 'axios';

export const httpService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpService.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default httpService;
