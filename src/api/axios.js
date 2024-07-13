import axios from 'axios'

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_JWT_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})