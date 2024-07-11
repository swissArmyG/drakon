import { Axios } from './axios'

export const createPatient = async(payload) => {
  const { data: { data }} = await Axios.post('/patients/create', {
    firstname: payload.firstname,
    lastname: payload.lastname,
    pain_description: payload.pain_description,
    pain_degree: payload.pain_degree,
    address: payload.address,
    email: payload.email,
    phone_number: parseInt(payload.phone_number),
    password: payload?.password
  })
  return data
}

export const readPatientByUserId = async(userId) => {
  const { data } = await Axios.get(`/patients`, {
    params: { userId } // Caution: this would be the param query or req.query in Express.js API, the equivalent of /patients?userId=
  })
  return data
}

export const updatePatient = async({ patientId, payload }) => {
  let updating = {}

  if (payload.firstname) {
    updating = { ...updating, firstname: payload.firstname }
  }

  if (payload.lastname) {
    updating = { ...updating, lastname: payload.lastname }
  }

  if (payload.pain_description) {
    updating = { ...updating, pain_description: payload.pain_description }
  }

  if (payload.pain_degree) {
    updating = { ...updating, pain_degree: payload.pain_degree }
  }

  if (payload.address) {
    updating = { ...updating, address: payload.address }
  }

  if (payload.email) {
    updating = { ...updating, email: payload.email }
  }

  if (payload.phone_number) {
    updating = { ...updating, phone_number: payload.phone_number }
  }

  const { data: { data }} = await Axios.put(`/patients/${patientId}/update`, updating)
  return data
}

export const requestNewConsultation = async (patientId) => {
  const { data: { data }} = await Axios.post(`/patients/${patientId}/consult`)
  return data
}