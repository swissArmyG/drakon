import axios from 'axios'

const globalHeaders = {
  Authorization: `Bearer ${process.env.TOKEN}`,
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: globalHeaders
})

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const CookieHeadersAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_UR}`,
  headers: globalHeaders
})

export {
  Axios,
  CookieHeadersAxios
}