/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  singleSelectOption, 
  multipleSelectOptions 
} from '../copies/homepage-form-options'
import { PANE_VARIABLES } from '../components/Consultation'

const CustomerContext = createContext()

const CustomerProvider = ({ children }) => {
  const navigate = useNavigate()
  const scrollToTopRef = useRef()

  const { INCOMPLETE, FIRST_PANE } = PANE_VARIABLES

  const [ pane, setPane ] = useState(FIRST_PANE)
  const [ stepsCompleted, setStepsCompleted ] = useState(INCOMPLETE)

  const [ singleOption, selectSingleOption ] = useState('')
  const [ multipleOptions, selectMultipleOptions ] = useState([])
  const [ painDegree, setPainDegree ] = useState('')
  const [ painDescriptions, setPainDescriptions ] = useState('')

  const [ customerProfile, setCustomerProfile ] = useState(undefined)
  const [ originalCustomerProfile, setOriginalCustomerProfile] = useState(undefined)

  const [ isRegisterClicked, setIsRegisterClicked ] = useState(false)

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
    const { 
      firstname = '', lastname = '', 
      email = '', phoneNumber = '', 
      isConsented = false 
    } = customerProfile || {};

    const firstStepCompleted = firstname && lastname && email && phoneNumber && isConsented

    const { 
      age = '', sex = '', 
      height = '', weight = '',
      painDuration = ''
    } = customerProfile || {}

    const secondStepCompleted = painDegree && age && sex && height && weight && painDuration && (
      !!singleOption 
        ? multipleOptions.concat(singleOption).length >= 1 
        : multipleOptions.length >= 1
    )

    let stepsCompleted = INCOMPLETE;

    if (firstStepCompleted || secondStepCompleted) {
      stepsCompleted = 1;
    }
    if (firstStepCompleted && secondStepCompleted) {
      stepsCompleted = 2;
    }
    
    setStepsCompleted(stepsCompleted)
  }, [singleOption, multipleOptions, painDegree, customerProfile])

  const resetForm = () => {
    selectSingleOption('')
    selectMultipleOptions([])
    setIsRegisterClicked(false)
    setPainDegree('')
    setCustomerProfile(undefined)
    setOriginalCustomerProfile(undefined)
    setPane(FIRST_PANE)
    setStepsCompleted(0)
    navigate("/")
    scrollToTopRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CustomerContext.Provider value={{
      isRegisterClicked,
      singleOption,
      multipleOptions,
      originalCustomerProfile,
      painDescriptions,
      painDegree,
      customerProfile,
      pane,
      resetForm,
      scrollToTopRef,
      stepsCompleted,
      selectSingleOption,
      selectMultipleOptions,
      setIsRegisterClicked,
      setPainDescriptions,
      setPainDegree,
      setCustomerProfile,
      setPane,
      setOriginalCustomerProfile,
      setStepsCompleted
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export { CustomerContext, CustomerProvider }