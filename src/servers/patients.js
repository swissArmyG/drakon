import { Axios } from './axios'

export const createPatient = async(payload) => {
  const { data } = await Axios.post('/patients/create', {
    firstname: payload.firstname,
    lastname: payload.lastname,
    pain_description: payload.pain_description,
    pain_degree: payload.pain_degree,
    address: payload.address,
    email: payload.email,
    phone_number: parseInt(payload.phone_number)
  })
  return data
}