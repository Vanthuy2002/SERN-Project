import axios from 'axios';
import { getFromStore } from '@/utils/contants';

const token = getFromStore('token');

let api = axios.create({
  baseURL: 'http://localhost:3200',
  headers: {
    'Content-Type': 'application/json',
  },
});
api.defaults.withCredentials = true;

api.interceptors.request.use(
  function (config) {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return err.response;
  }
);

export { api };
