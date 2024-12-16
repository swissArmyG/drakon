/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAGE_VARIABLES } from '../components/Consultation'
import { questionsByPage } from '../copies/homepage-form-options'
import { validateFields } from '../utils/validation'

const CustomerContext = createContext()

const CustomerProvider = ({ children }) => {
  // const location = useLocation()
  const navigate = useNavigate()

  const scrollToTopRef = useRef()

  const { INCOMPLETE, FIRST_PAGE } = PAGE_VARIABLES

  const [ isValidatingForm, setIsValidatingForm ] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ missingFields, setMissingFields ] = useState([])

  const [ page, setPage ] = useState(FIRST_PAGE)
  const [ paginatedQuestions, setPaginatedQuestions ] = useState([])

  const [ customerProfile, setCustomerProfile ] = useState(undefined)
  const [ originalCustomerProfile, setOriginalCustomerProfile] = useState(undefined)

  const [ dropboxAccessToken, setDropboxAccessToken ] = useState('')
  const [ file, setFile ] = useState(undefined)

  const [ stepsCompleted, setStepsCompleted ] = useState(INCOMPLETE)

  const scrollToTop = () => {
    scrollToTopRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Initialize the customerProfile from localStorage on component mount
    const savedProfile = localStorage.getItem('customerProfile')
    if (savedProfile) {
      setCustomerProfile(JSON.parse(savedProfile)) // Update context if needed
    }
  }, [setCustomerProfile])  // Run only once when the component mounts
  
  useEffect(() => {
    const currentPageQuestions = questionsByPage[page] || []
    setPaginatedQuestions(currentPageQuestions)
  }, [page])

  const isInvalid = useCallback((field) => {
    if (isValidatingForm) {
      const fieldValue = customerProfile?.[field]

      return !fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0) ? '--invalid' : ''
    }
    return '' 
  }, [isValidatingForm, customerProfile])

  const onValidateField = (_missingFields) => {
    setMissingFields([
      ...missingFields, 
      ..._missingFields
    ])
  }

  const _validateFields = (requiredFields) => {
    const validationAttributes = {
      payload: customerProfile,
      onValidateField
    }

    return validateFields({
      ...validationAttributes,
      requiredFields
    })
  }

  const firstStepCompleted = () => {
    const requiredFields = ['firstname', 'lastname', 'email', 'phoneNumber', 'isConsented'];

    return _validateFields(requiredFields)
  };

  const secondStepCompleted = () => {
    const requiredFields = ['age', 'sex', 'height', 'weight', 'occupation', 'acutePainType', 'painDegree', 'painDuration'];

    return _validateFields(requiredFields) 
      && customerProfile?.painSummary?.length > 0
  };

  const thirdStepCompleted = () => {
    const requiredFields = ['activityLevel', 'painStartType', 'physicalTherapyHistory']

    return _validateFields(requiredFields)
      && customerProfile?.painAreas?.length > 0
      && customerProfile?.painStartCauses?.length > 0
  }

  const fourthStepCompleted = () => {
    const requiredFields = ['limbWeaknessNumbness', 'walkingUnsteadiness']

    const nestedOfferedSpinalSurgery = ['offeredProcedure', 'offeredBy', 'discussedResult']
    
    const nestedPreviousSpinalSurgery = ['surgeryType', 'surgeryDateTime', 'surgeon']
    
    const offeredSpinalSurgery = customerProfile?.offeredSpinalSurgery === 'Yes'
      ? nestedOfferedSpinalSurgery.every(field => !!customerProfile?.[field])
      : !!customerProfile?.offeredSpinalSurgery

    const previousSpinalSurgery = customerProfile?.previousSpinalSurgery === 'Yes'
      ? nestedPreviousSpinalSurgery.every(field => !!customerProfile?.[field])
      : !!customerProfile?.previousSpinalSurgery

    return _validateFields(requiredFields)  
      && offeredSpinalSurgery
      && previousSpinalSurgery
      && customerProfile?.spineImagingTypes?.length > 0 
  }

  const fifthStepCompleted = () => {
    const requiredFields = ['handObjectManipulationProblem', 'pastPainMedication', 'currentPainMedication']
    
    return _validateFields(requiredFields)
      && customerProfile?.painfulActivities?.length > 0
      && customerProfile?.painfulLegActivities?.length > 0
  }

  const sixthStepCompleted = () => {
    const requiredFields = ['unoperationalDueToPain', 'physicianVisitForPain']

    const nestedInjectionRelief = ['helpfulInjection', 'injectionReliefDuration'].every(field => !!customerProfile?.[field])

    const injectionProcedureForPain = customerProfile?.injectionProcedureForPain === 'Yes'
      ? customerProfile?.injectionTypes?.length > 0
      : !!customerProfile?.injectionProcedureForPain

    const injectionRelief = customerProfile?.injectionRelief === 'Yes'
      ? nestedInjectionRelief
      : !!customerProfile?.injectionRelief

    const helpfulActivities = customerProfile?.helpfulActivities?.length > 0

    return _validateFields(requiredFields)
      && injectionProcedureForPain 
      && injectionRelief 
      && helpfulActivities
  }

  const seventhStepCompleted = () => {
    const requiredFields = ['medicalProblem', 'currentMedication']

    return _validateFields(requiredFields)
  }

  const determineStepsCompleted = () => {
    let _stepsCompleted = page
    
    const decrementStep = () => {
      if (_stepsCompleted >= page) {
        return _stepsCompleted - 1
      }
    } 
  
    switch (page) {
      case 1:
        _stepsCompleted = firstStepCompleted() ? 1 : 0;
        break;
      case 2:
        _stepsCompleted = secondStepCompleted() ? 2 : decrementStep()
        break;
      case 3:
        _stepsCompleted = thirdStepCompleted() ? 3 : decrementStep()            
        break;
      case 4:
        _stepsCompleted = fourthStepCompleted() ? 4 : decrementStep()
        break;
      case 5:
        _stepsCompleted = fifthStepCompleted() ? 5 : decrementStep()
        break;
      case 6:
        _stepsCompleted = sixthStepCompleted() ? 6 : decrementStep()
        break;
      case 7:
        _stepsCompleted = seventhStepCompleted() ? 7 : decrementStep()
        break;
      default:
        break;
    }  
    
    setStepsCompleted(_stepsCompleted);
  };

  useEffect(() => {
    determineStepsCompleted()
  }, [customerProfile, page])

  const validateForm = (_isValidating) => {
    setIsValidatingForm(_isValidating)
  }

  const resetForm = () => {
    setCustomerProfile(undefined)
    setOriginalCustomerProfile(undefined)
    setPage(FIRST_PAGE)
    setStepsCompleted(0)
    navigate("/")
    scrollToTop()
  }

  const setCustomerLocalStorage = () => {
    localStorage.setItem('customerProfile', JSON.stringify(customerProfile))
  }

  const removeCustomerLocalStorage = () => {
    localStorage.removeItem('customerProfile')
  }

  return (
    <CustomerContext.Provider value={{
      isInvalid,
      isValidatingForm,
      isSubmitting,
      customerProfile,
      dropboxAccessToken,
      missingFields,
      originalCustomerProfile,
      paginatedQuestions,
      page,
      file,
      removeCustomerLocalStorage,
      resetForm,
      scrollToTopRef,
      stepsCompleted,
      setCustomerLocalStorage,
      setCustomerProfile,
      setDropboxAccessToken,
      setIsSubmitting,
      setMissingFields,
      setPage,
      setFile,
      setOriginalCustomerProfile,
      setStepsCompleted,
      validateForm
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export { CustomerContext, CustomerProvider }