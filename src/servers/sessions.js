import Axios from './axios'

export const login = async(payload) => {
  await Axios.post('/login', {
    email: payload.email,
    password: payload
  })
}

export const readSessionBySessionId = async(sessionId) => {
  await Axios.get(`/session/${sessionId}`)
}