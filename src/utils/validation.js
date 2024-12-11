export const containsMissingFields = ({ payload, requiredFields })=> {
  let missingFields = [];
  
  for (const field of requiredFields) {
    if (!payload || !payload[field]) {
        missingFields.push(field)
    }
  }

  return missingFields
}

export const validateFields = ({ payload, requiredFields, onValidateField }) => {
  const missingFields = containsMissingFields({
    payload,
    requiredFields
  })

  onValidateField(missingFields)

  return requiredFields.every(field => {
    return !!payload?.[field]
  })
}