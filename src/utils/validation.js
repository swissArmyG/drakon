export const containsMissingFields = ({ payload, requiredFields })=> {
  console.log(payload)
  let missingFields = [];
  
  for (const field of requiredFields) {
    if (!payload[field] || (field && payload[field].trim() === '')) {
      missingFields.push(field)
    }
  }

  return missingFields
}