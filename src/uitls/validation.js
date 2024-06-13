export const containsMissingFields = ({ payload, requiredFields })=> {
  let missingFields = [];
  
  for (const field of requiredFields) {
    if (!payload[field]) {
      missingFields.push(field)
    }
  }

  if (missingFields.length > 0) {
    return missingFields.join(', ')
  }

  return undefined
}