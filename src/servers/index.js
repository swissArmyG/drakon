import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})