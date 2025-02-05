import axios from 'axios'

export const Axios = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true
})