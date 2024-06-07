import { Axios, AuthenticationAxios } from './axios'

export const login = async(payload) => {
  const { data } = await AuthenticationAxios.post('/login', {
    email: payload.email,
    password: payload.password
  }, { withCredentials: true })

  const { accessToken, refreshToken } = data
  const httpOnlyAttributes = `Path=/; HttpOnly; Secure; SameSite=Lax;`

  const cookieHeaders = [
    `accessToken=${accessToken}; ${httpOnlyAttributes}`,
    `refreshToken=${refreshToken}; ${httpOnlyAttributes}`,
  ].join('; ')
  
  AuthenticationAxios.interceptors.request.use(
    (config) => {
      config.headers['Cookie'] = cookieHeaders
      return config
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  return data
}

export const readSessionBySessionId = async(sessionId) => {
  const { data } = await Axios.get(`/session/${sessionId}`)
  return data;
}