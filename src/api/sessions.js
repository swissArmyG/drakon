import { Axios } from './axios'

export const login = async(payload) => {
  const { data: { data }} = await Axios.post('/login', {
    email: payload.email,
    password: payload.password
  }, { withCredentials: true })

  return data
}

export const forgotPassword = async(email) => {
  const { data: { data }} = await Axios.post('/password/forgot', {
    email
  })

  return data
}

export const renderResetPassword = async({ token, userId }) => {
  const { data: { data }} = await Axios.get('/password/reset', {
    params: { token, userId }
  })

  return data
}

export const resetPassword = async({ password, token, userId }) => {
  const { data: { data }} = await Axios.post('/password/reset', {
    new_password: password,
    reset_password_token: token,
    user_id: userId
  })
 
  return data
}

export const readSessionBySessionId = async(sessionId) => {
  const { data } = await Axios.get(`/session/${sessionId}`)
  return data
}