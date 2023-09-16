import axios from 'axios';

let api = axios.create({
  baseURL: 'http://localhost:3200',
  headers: {
    'Content-Type': 'application/json',
  },
});
api.defaults.withCredentials = true;
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
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
