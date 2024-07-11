export const containsMissingFields = ({ payload, requiredFields })=> {
  let missingFields = [];
  
  for (const field of requiredFields) {
    if (!payload || !payload[field] || (field && payload[field].trim() === '')) {
      missingFields.push(field)
    }
  }

  return missingFields
}