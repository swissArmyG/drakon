import { Axios } from './axios'

export const login = async(payload) => {
  const { data: { data }} = await Axios.post('/login', {
    email: payload.email,
    password: payload.password
  }, { withCredentials: true })

  return data
}

export const readSessionBySessionId = async(sessionId) => {
  const { data } = await Axios.get(`/session/${sessionId}`)
  return data;
}