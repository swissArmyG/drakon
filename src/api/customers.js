import { Axios } from './axios'

export const createCustomer = async(payload) => {
  const {
    firstname,
    lastname,
    acutePainType,
    painDegree,
    painDuration,
    painSummary,
    email,
    phoneNumber,
    password = undefined
  } = payload


  const { data } = await Axios.post('/patients/create', {
    firstname,
    lastname,
    acutePainType,
    painDegree,
    painDuration,
    painSummary,
    email,
    phone_number: parseInt(phoneNumber),
    password
  })
  return data
}

export const readCustomerByUserId = async(userId) => {
  const { data } = await Axios.get(`/patients`, {
    params: { userId } // Caution: this would be the param query or req.query in Express.js API, the equivalent of /patients?userId=
  })
  return data
}

export const updateCustomer = async({ patientId, payload }) => {
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