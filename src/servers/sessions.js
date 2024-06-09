import { Axios, CookieHeadersAxios } from './axios'

export const login = async(payload) => {
  const { data } = await CookieHeadersAxios.post('', {
    email: payload.email,
    password: payload.password
  }, { withCredentials: true })

  const { accessToken, refreshToken } = data
  const httpOnlyAttributes = `Path=/; HttpOnly; Secure; SameSite=Lax;`

  const cookieHeaders = [
    `accessToken=${accessToken}; ${httpOnlyAttributes}`,
    `refreshToken=${refreshToken}; ${httpOnlyAttributes}`,
  ].join('; ')
  
  CookieHeadersAxios.interceptors.request.use(
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