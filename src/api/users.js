import { Axios } from "./axios"

export const createUser = async(payload) => {
  const { data: { data }} = await Axios.post('/users/create', {
    email: payload.email,
    password: payload.password
  })
  return data
}