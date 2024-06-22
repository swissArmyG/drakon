const setToken = (token) => {
  const oneHr = 3600000
  const expires = new Date(Date.now() + oneHr).toUTCString()

  localStorage.setItem('accessToken', token)
  document.cookie = `accessToken=${token}; expires=${expires}; path=/; secure; HttpOnly; max-age=${oneHr}`;  
}

const getToken = () => {
  const token = localStorage.getItem('accessToken') || document.cookie.match(/accessToken=([^;]*)/)[1];
  return token
}

const removeToken = () => {
  const expires = new Date(Date.now()).toUTCString()

  localStorage.removeItem('accessToken')
  document.cookie = `accessToken=; expires=${expires}`
}

export { setToken, getToken, removeToken }