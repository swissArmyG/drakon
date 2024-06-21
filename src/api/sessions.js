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

export const renderPasswordReset = async({ token, userId }) => {
  const data = await Axios.get('/password/reset', {
    params: { token, userId }
  })

  return data
}

export const resetPassword = async({ password, userId, token }) => {
  const { data: { data }} = await Axios.post('/password/reset', {
    new_password: password,
    user_id: userId,
    reset_password_token: token
  })
 
  return data
}

export const readSessionBySessionId = async(sessionId) => {
  const { data } = await Axios.get(`/session/${sessionId}`)
  return data
}