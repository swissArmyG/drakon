import { api } from './index'

export const createPatient = async(payload) => {
  await api.post('/patients/create', {
    firstname: payload.firstname,
    lastname: payload.lastname,
    pain_description: payload.pain_description,
    pain_degree: payload.pain_degree,
    address: payload.address,
    email: payload.email,
    phone_number: parseInt(payload.phone_number)
  })
}