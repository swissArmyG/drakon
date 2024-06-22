import axios from 'axios'
// import { getToken, setToken, removeToken } from './tokens'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Axios.interceptors.push({
//   request: (config) => {
//     const token = getToken()
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config;
//   },
//   response: (response) => {
//     const newToken = response.headers['x-new-token']
//     if (newToken) {
//       setToken(newToken)
//     }
//     return response;
//   },
//   error: (err) => {
//     if (err.response && err.response.status === 401) {
//       removeToken()
//     }
//     return Promise.reject(err)
//   }
// })