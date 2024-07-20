import { Axios } from './axios'

export const createCustomer = async(payload) => {
  const creating = {
    first_name: payload.firstname,
    last_name: payload.lastname,
    email: payload.email,
    phone_number: payload.phoneNumber,
    is_consented: payload.isConsented,
    age: payload.age,
    sex: payload.sex,
    height: payload.height,
    weight: payload.weight,
    occupation: payload.occupation,
    acute_pain_type: payload.acutePainType,
    pain_summary: JSON.stringify(payload.painSummary),
    pain_degree: payload.painDegree,
    pain_duration: payload.painDuration,
    activity_level: payload.activityLevel,
    pain_area: JSON.stringify(payload.painArea),
    pain_start_type: payload.painStartType,
    pain_start_cause: JSON.stringify(payload.painStartCause),
    physical_therapy_history: payload.physicalTherapyHistory,
    offered_spinal_surgery: payload.offeredSpinalSurgery,
    spine_imaging_types: JSON.stringify(payload.spineImagingTypes),
    previous_spinal_surgery: payload.previousSpinalSurgery,
    limb_weakness_numbness: payload.limbWeaknessNumbness,
    walking_unsteadiness: payload.walkingUnsteadiness,
    offered_procedure: payload.offeredProcedure,
    offered_by: payload.offeredBy,
    results_discussed: payload.resultsDiscussed,
    surgery_type: payload.surgeryType,
    surgery_date_time: payload.surgeryDateTime,
    surgeon: payload.surgeon,
    hand_object_manipulation_problems: payload.handObjectManipulationProblems,
    past_pain_medications: payload.pastPainMedications,
    current_pain_medications: payload.currentPainMedications,
    painful_activities: JSON.stringify(payload.painfulActivities),
    painful_leg_activities: JSON.stringify(payload.painfulLegActivities),
    helpful_activities: JSON.stringify(payload.helpfulActivities),
    unoperational_due_to_pain: payload.unoperationalDueToPain,
    physician_visit_for_pain: payload.physicianVisitForPain,
    injection_procedures_for_pain: payload.injectionProceduresForPain,
    injection_types: JSON.stringify(payload.injectionTypes),
    injection_relief: payload.injectionRelief,
    helpful_injections: payload.helpfulInjections,
    injection_relief_duration: payload.injectionReliefDuration,
    medical_problems: payload.medicalProblems,
    current_medications: payload.currentMedications,
    password: payload.password
  }

  const { data } = await Axios.post('/customers/create', creating)
  return data
}

export const readCustomerByUserId = async(userId) => {
  const { data } = await Axios.get(`/customers`, {
    params: { userId } // Caution: this would be the param query or req.query in Express.js API, the equivalent of /customers?userId=
  })
  return data
}

export const updateCustomer = async({ customerId, payload }) => {
  const updating = {
    ...(payload.firstname && { first_name: payload.firstname }),
    ...(payload.lastname && { last_name: payload.lastname }),
    ...(payload.email && { email: payload.email }),
    ...(payload.phoneNumber && { phone_number: payload.phoneNumber }),
    ...(payload.isConsented && { is_consented: payload.isConsented }),
    ...(payload.age && { age: payload.age }),
    ...(payload.sex && { sex: payload.sex }),
    ...(payload.height && { height: payload.height }),
    ...(payload.weight && { weight: payload.weight }),
    ...(payload.occupation && { occupation: payload.occupation }),
    ...(payload.acutePainType && { acute_pain_type: payload.acutePainType }),
    ...(payload.painSummary && { pain_summary: JSON.stringify(payload.painSummary) }),
    ...(payload.painDegree && { pain_degree: payload.painDegree }),
    ...(payload.painDuration && { pain_duration: payload.painDuration }),
    ...(payload.activityLevel && { activity_level: payload.activityLevel }),
    ...(payload.painArea && { pain_area: JSON.stringify(payload.painArea) }),
    ...(payload.painStartType && { pain_start_type: payload.painStartType }),
    ...(payload.painStartCause && { pain_start_cause: JSON.stringify(payload.painStartCause) }),
    ...(payload.physicalTherapyHistory && { physical_therapy_history: payload.physicalTherapyHistory }),
    ...(payload.offeredSpinalSurgery && { offered_spinal_surgery: payload.offeredSpinalSurgery }),
    ...(payload.spineImagingTypes && { spine_imaging_types: JSON.stringify(payload.spineImagingTypes) }),
    ...(payload.previousSpinalSurgery && { previous_spinal_surgery: payload.previousSpinalSurgery }),
    ...(payload.limbWeaknessNumbness && { limb_weakness_numbness: payload.limbWeaknessNumbness }),
    ...(payload.walkingUnsteadiness && { walking_unsteadiness: payload.walkingUnsteadiness }),
    ...(payload.offeredProcedure && { offered_procedure: payload.offeredProcedure }),
    ...(payload.offeredBy && { offered_by: payload.offeredBy }),
    ...(payload.resultsDiscussed && { results_discussed: payload.resultsDiscussed }),
    ...(payload.surgeryType && { surgery_type: payload.surgeryType }),
    ...(payload.surgeryDateTime && { surgery_date_time: payload.surgeryDateTime }),
    ...(payload.surgeon && { surgeon: payload.surgeon }),
    ...(payload.handObjectManipulationProblems && { hand_object_manipulation_problems: payload.handObjectManipulationProblems }),
    ...(payload.pastPainMedications && { past_pain_medications: payload.pastPainMedications }),
    ...(payload.currentPainMedications && { current_pain_medications: payload.currentPainMedications }),
    ...(payload.painfulActivities && { painful_activities: JSON.stringify(payload.painfulActivities) }),
    ...(payload.painfulLegActivities && { painful_leg_activities: JSON.stringify(payload.painfulLegActivities) }),
    ...(payload.helpfulActivities && { helpful_activities: JSON.stringify(payload.helpfulActivities) }),
    ...(payload.unoperationalDueToPain && { unoperational_due_to_pain: payload.unoperationalDueToPain }),
    ...(payload.physicianVisitForPain && { physician_visit_for_pain: payload.physicianVisitForPain }),
    ...(payload.injectionProceduresForPain && { injection_procedures_for_pain: payload.injectionProceduresForPain }),
    ...(payload.injectionTypes && { injection_types: JSON.stringify(payload.injectionTypes) }),
    ...(payload.injectionRelief && { injection_relief: payload.injectionRelief }),
    ...(payload.helpfulInjections && { helpful_injections: payload.helpfulInjections }),
    ...(payload.injectionReliefDuration && { injection_relief_duration: payload.injectionReliefDuration }),
    ...(payload.medicalProblems && { medical_problems: payload.medicalProblems }),
    ...(payload.currentMedications && { current_medications: payload.currentMedications }),
    ...(payload.password && { password: payload.password }),
  }

  const { data: { data } } = await Axios.put(`/customers/${customerId}/update`, updating)
  return data
}

export const requestNewConsultation = async (customerId) => {
  const { data: { data }} = await Axios.post(`/customers/${customerId}/consult`)
  return data
}