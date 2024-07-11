/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react'
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../copies/homepage-form-options'
import { PANE_VARIABLES } from '../components/Consultation'

const PatientContext = createContext()

const PatientProvider = ({ children }) => {
  const { INCOMPLETE, FIRST_PANE } = PANE_VARIABLES

  const [ pane, setPane ] = useState(FIRST_PANE)
  const [ stepsCompleted, setStepsCompleted ] = useState(INCOMPLETE)

  const [ singleOption, selectSingleOption ] = useState('')
  const [ multipleOptions, selectMultipleOptions ] = useState([])
  const [ painDegree, setPainDegree ] = useState('')
  const [ painDescriptions, setPainDescriptions ] = useState('')
  const [ patientProfile, setPatientProfile ] = useState(undefined)

  const [ originalPatientProfile, setOriginalPatientProfile] = useState(patientProfile)

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

  useEffect(() => {
    const firstStepCompleted = !!painDegree && (
      !!singleOption 
        ? multipleOptions.concat(singleOption).length >= 1 
        : multipleOptions.length >= 1
    )

    const { firstname = '', lastname = '', email = '', phoneNumber = '' } = patientProfile || {};
    const secondStepCompleted = firstname && lastname && email && phoneNumber 

    let stepsCompleted = INCOMPLETE;

    if (firstStepCompleted || secondStepCompleted) {
      stepsCompleted = 1;
    }
    if (firstStepCompleted && secondStepCompleted) {
      stepsCompleted = 2;
    }
    
    setStepsCompleted(stepsCompleted)
  }, [singleOption, multipleOptions, painDegree, patientProfile])

  const resetForm = () => {
    selectSingleOption('')
    selectMultipleOptions([])
    setPainDegree('')
    setPatientProfile(undefined)
    setPane(FIRST_PANE)
    setStepsCompleted(0)
  }

  return (
    <PatientContext.Provider value={{
      isRegistering,
      singleOption,
      multipleOptions,
      originalPatientProfile,
      painDescriptions,
      painDegree,
      patientProfile,
      pane,
      resetForm,
      stepsCompleted,
      setIsRegistering,
      selectSingleOption,
      selectMultipleOptions,
      setPainDescriptions,
      setPainDegree,
      setPatientProfile,
      setOriginalPatientProfile,
      setStepsCompleted
    }}>
      {children}
    </PatientContext.Provider>
  )
}

export { PatientContext, PatientProvider }