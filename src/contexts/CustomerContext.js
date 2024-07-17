/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PANE_VARIABLES } from '../components/Consultation'
import { additionalQuestions } from '../copies/homepage-form-options'

const CustomerContext = createContext()

const CustomerProvider = ({ children }) => {
  const navigate = useNavigate()
  const scrollToTopRef = useRef()

  const { INCOMPLETE, FIRST_PANE } = PANE_VARIABLES

  const [ isRegisterClicked, setIsRegisterClicked ] = useState(false)

  const [ pane, setPane ] = useState(FIRST_PANE)
  const [ paginatedQuestions, setPaginatedQuestions ] = useState(undefined)

  const [ formPage, setFormPage ] = useState(0)

  const [ customerProfile, setCustomerProfile ] = useState(undefined)
  const [ originalCustomerProfile, setOriginalCustomerProfile] = useState(undefined)

  const [ stepsCompleted, setStepsCompleted ] = useState(INCOMPLETE)

  useEffect(() => {
    if (pane >= 3) {
      const pageSize = 5;
      const startIndex = formPage * pageSize;
      const endIndex = startIndex + pageSize;
      const newPaginatedQuestions = Object.fromEntries(
        Object.entries(additionalQuestions)
              .slice(startIndex, endIndex)
      );
  
      setPaginatedQuestions(newPaginatedQuestions)
    }
  }, [pane]);

  const firstStepCompleted = () => {
    const requiredFields = ['firstname', 'lastname', 'email', 'phoneNumber', 'isConsented'];

    return requiredFields.every(field => !!customerProfile?.[field]);
  };

  const secondStepCompleted = () => {
    const requiredFields = ['age', 'sex', 'height', 'weight', 'occupation', 'acutePainType', 'painDegree', 'painDuration'];

    return requiredFields.every(field => !!customerProfile?.[field]) 
      && customerProfile?.painSummary?.length > 0
  };

  const thirdStepCompleted = () => {
    const requiredFields = ['activityLevel', 'painStartType', 'physicalTherapyHistory']

    return requiredFields.every(field => !!customerProfile?.[field])
      && customerProfile?.painArea?.length > 0
      && customerProfile?.painStartCause?.length > 0
  }

  const fourthStepCompleted = () => {
    const nestedOfferedSpinalSurgery = ['offeredProcedure', 'offeredBy', 'resultsDiscussed']
    const nestedPreviousSpinalSurgery = ['surgeryType', 'surgeryDateTime', 'surgeon']
    const requiredFields = ['limbWeaknessNumbness', 'walkingUnsteadiness']
    
    const offeredSpinalSurgery = customerProfile?.offeredSpinalSurgery === 'Yes'
      ? nestedOfferedSpinalSurgery.every(field => !!customerProfile?.[field])
      : !!customerProfile?.offeredSpinalSurgery

    const previousSpinalSurgery = customerProfile?.previousSpinalSurgery === 'Yes'
      ? nestedPreviousSpinalSurgery.every(field => !!customerProfile?.[field])
      : !!customerProfile?.previousSpinalSurgery

    return offeredSpinalSurgery
      && previousSpinalSurgery
      && customerProfile?.spineImagingTypes?.length > 0
      && requiredFields.every(field => !!customerProfile?.[field])
  }

  const fifthStepCompleted = () => {
    const requiredFields = ['handObjectManipulationProblems', 'pastPainMedications', 'currentPainMedications']
    
    return requiredFields.every(field => !!customerProfile?.[field])
      && customerProfile?.painfulActivities?.length > 0
      && customerProfile?.painfulLegActivities?.length > 0
  }

  const sixthStepCompleted = () => {
    const requiredFields = ['unoperationalDueToPain', 'physicianVisitForPain'].every(field => !!customerProfile?.[field])

    const nestedInjectionRelief = ['helpfulInjections', 'injectionReliefDuration'].every(field => !!customerProfile?.[field])

    const injectionProceduresForPain = customerProfile?.injectionProceduresForPain === 'Yes'
      ? customerProfile?.injectionTypes?.length > 0
      : !!customerProfile?.injectionProceduresForPain

    const injectionRelief = customerProfile?.injectionRelief === 'Yes'
      ? nestedInjectionRelief
      : !!customerProfile?.injectionRelief

    const helpfulActivities = customerProfile?.helpfulActivities?.length > 0

    return requiredFields && injectionProceduresForPain && injectionRelief && helpfulActivities
  }

  const seventhStepCompleted = () => {
    const requiredFields = ['medicalProblems', 'currentMedications']
    return requiredFields.every(field => !!customerProfile?.[field])
  }

  const determineStepsCompleted = () => {
    let _stepsCompleted = pane
    
    const decrementStep = () => {
      if (_stepsCompleted >= pane) {
        return _stepsCompleted - 1
      }
    } 
  
    switch (pane) {
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
  }, [customerProfile, pane])

  const resetForm = () => {
    setCustomerProfile(undefined)
    setOriginalCustomerProfile(undefined)
    setIsRegisterClicked(false)
    setPane(FIRST_PANE)
    setStepsCompleted(0)
    navigate("/")
    scrollToTopRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <CustomerContext.Provider value={{
      customerProfile,
      isRegisterClicked,
      originalCustomerProfile,
      paginatedQuestions,
      pane,
      formPage,
      resetForm,
      scrollToTopRef,
      stepsCompleted,
      setIsRegisterClicked,
      setCustomerProfile,
      setPane,
      setOriginalCustomerProfile,
      setFormPage,
      setStepsCompleted
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

export { CustomerContext, CustomerProvider }