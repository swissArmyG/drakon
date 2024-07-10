/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react'
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../copies/homepage-form-options'

const PatientContext = createContext()

const PatientProvider = ({ children }) => {
  const [ singleOption, selectSingleOption ] = useState('')
  const [ multipleOptions, selectMultipleOptions ] = useState([])
  const [ painDegree, setPainDegree ] = useState('')
  const [ painDescriptions, setPainDescriptions ] = useState('')
  const [ patientProfile, setPatientProfile ] = useState(undefined)
  const [ isRegistering, setIsRegistering ] = useState(false)

  useEffect(() => {
    const _painDescriptions = [
      ...multipleOptions.map(option =>{               
        return multipleSelectOptions[option]
      }), 
      singleSelectOption[singleOption]
    ].join(', ')

    if (multipleOptions.length > 0 && !!singleOption) {
      setPainDescriptions(_painDescriptions)
    }
    
  }, [multipleOptions, singleSelectOption])

  return (
    <PatientContext.Provider value={{
      isRegistering,
      singleOption,
      multipleOptions,
      painDescriptions,
      painDegree,
      patientProfile,
      setIsRegistering,
      selectSingleOption,
      selectMultipleOptions,
      setPainDescriptions,
      setPainDegree,
      setPatientProfile
    }}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientProvider }