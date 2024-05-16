import axios from 'axios'

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;