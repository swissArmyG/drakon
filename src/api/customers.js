import { Axios } from './axios'

export const createCustomer = async(payload) => {
  const {
    firstname,
    lastname,
    email,
    phoneNumber,
    isConsented,
    age,
    sex,
    height,
    weight,
    occupation,
    acutePainType,
    painSummary,
    painDegree,
    painDuration,
    activityLevel,
    painArea,
    painStartType,
    painStartCause,
    physicalTherapyHistory,
    offeredSpinalSurgery,
    spineImagingTypes,
    previousSpinalSurgery,
    limbWeaknessNumbness,
    walkingUnsteadiness,
    offeredProcedure,
    offeredBy,
    resultsDiscussed,
    surgeryType,
    surgeryDateTime,
    surgeon,
    handObjectManipulationProblems,
    pastPainMedications,
    currentPainMedications,
    painfulActivities,
    painfulLegActivities,
    helpfulActivities,
    unoperationalDueToPain,
    physicianVisitForPain,
    injectionProceduresForPain,
    injectionTypes,
    injectionRelief,
    helpfulInjections,
    injectionReliefDuration,
    medicalProblems,
    currentMedications,
    password
  } = payload


  const { data } = await Axios.post('/customers/create', {
    firstname,
    lastname,
    email,
    phoneNumber,
    isConsented,
    age,
    sex,
    height,
    weight,
    occupation,
    acutePainType,
    painSummary,
    painDegree,
    painDuration,
    activityLevel,
    painArea,
    painStartType,
    painStartCause,
    physicalTherapyHistory,
    offeredSpinalSurgery,
    spineImagingTypes,
    previousSpinalSurgery,
    limbWeaknessNumbness,
    walkingUnsteadiness,
    offeredProcedure,
    offeredBy,
    resultsDiscussed,
    surgeryType,
    surgeryDateTime,
    surgeon,
    handObjectManipulationProblems,
    pastPainMedications,
    currentPainMedications,
    painfulActivities,
    painfulLegActivities,
    helpfulActivities,
    unoperationalDueToPain,
    physicianVisitForPain,
    injectionProceduresForPain,
    injectionTypes,
    injectionRelief,
    helpfulInjections,
    injectionReliefDuration,
    medicalProblems,
    currentMedications,
    password
  })
  return data
}

export const readCustomerByUserId = async(userId) => {
  const { data } = await Axios.get(`/customers`, {
    params: { userId } // Caution: this would be the param query or req.query in Express.js API, the equivalent of /customers?userId=
  })
  return data
}

export const updateCustomer = async({ customerId, payload }) => {
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

  const { data: { data }} = await Axios.put(`/customers/${customerId}/update`, updating)
  return data
}

export const requestNewConsultation = async (customerId) => {
  const { data: { data }} = await Axios.post(`/customers/${customerId}/consult`)
  return data
}