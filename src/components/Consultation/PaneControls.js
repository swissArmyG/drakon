import React, { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { FadedBgButton } from '../Buttons'
import { 
  createPatient, 
  updatePatient, 
  requestNewConsultation
} from "../../api/patients"
import { AuthContext, NotificationContext, PatientContext } from "../../contexts"

export const PANE_VARIABLES = {
  INCOMPLETE: 0,
  FIRST_PANE: 1,
  LAST_PANE: 2,
}

export const PaneControls = ({ windowWidth }) => {
  const { FIRST_PANE, LAST_PANE } = PANE_VARIABLES

  const navigate = useNavigate()

  const { userData } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const { 
    isRegistering,
    originalPatientProfile,
    painDescriptions,
    painDegree,
    pane,
    patientProfile,
    resetForm,
    setPane,
    stepsCompleted
  } = useContext(PatientContext)

  const getChangedFields = () => {
    const changedFields = {}
    Object.keys(patientProfile).forEach(key => {
      if (patientProfile[key] !== originalPatientProfile[key]) {
        changedFields[key] = patientProfile[key]
      }
    })
    return changedFields
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const requestExistingAccountConsultation = async () => {
    if (patientProfile?.id) {
      try {
        await requestNewConsultation()
        resetForm()
      } catch (err) {
        setNotification({
          type: 'error',
          message: 'Something went wrong while requesting a new consultation. Please try again later.'
        })
      }
    }
  }

  const requestExistingAccountUpdateConsultation = async () => {
    const changedFields = getChangedFields()
    try {
      await updatePatient({
        patientId: patientProfile.id,
        payload: changedFields
      })
    } catch (err) {
      setNotification({
        typpe: "error",
        message: "Something went wrong. We are unable to update your information at the moment. Please try again later."
      })
    }
  }

  const requestNonAccountConsultation = async () => {
    setIsSubmitting(true)
    
    try {
      patientProfile && await createPatient({
        firstname: patientProfile.firstname,
        lastname: patientProfile.lastname,
        pain_description: painDescriptions,
        pain_degree: painDegree,
        address: patientProfile.address,
        email: patientProfile.email,
        phone_number: patientProfile.phoneNumber
      })

      setNotification({ 
        type: 'success', 
        message: 'You have requested an appointment! Our doctor will reach out to you soon via the email or the phone number you provided.'
      })

      resetForm()
    } catch (err) {
      setNotification({ 
        type: 'error', 
        message: 'Unable to request appointment currently, please try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const requestConsultation = {
    existingAccount: {
      request: () => requestExistingAccountConsultation(),
      update: (payload) => requestExistingAccountUpdateConsultation(payload)
    },
    newAccount: {
      register: () => navigate("/register")
    },  
    nonAccount: () => requestNonAccountConsultation()
  }

  const determineExistingAccountConsultation = () => {
     const changedFields = getChangedFields()

     if (Object.keys(changedFields) > 0) {
        requestExistingAccountConsultation(changedFields)
     } else {
        requestConsultation.existingAccount.request()
     }
  }

  const determineSubmitButtonText = () => {
    return (!userData && isRegistering) 
      ? 'REGISTER' 
      : 'SUBMIT'
  }

  const determineSubmitButtonFunc = () => {
    if (userData) {
    // CONFIRMATION REQUIRED: if the user account already exists
      // USE OLD EMAIL: update changed fields w old email
      // USE NEW EMAIL: update changed fields w new email
      userData.email !== patientProfile.email
        ?  navigate("/confirm", {
          state: { email: patientProfile.email }
        })
        : determineExistingAccountConsultation()
    } else {
      isRegistering
        ? requestConsultation.newAccount.register()
        : requestConsultation.nonAccount()
    }
  }

  const buttonWidth = windowWidth > 613 ? "300px" : "160px"
  const buttonTextPosition = windowWidth > 613 ? undefined : "0%"
  
  const isFirstPane = pane === FIRST_PANE
  const isLastPane = pane === LAST_PANE

  const isNextable = stepsCompleted >= FIRST_PANE
  const isSubmittable = isLastPane && stepsCompleted === LAST_PANE 

  let isDisabled = false;
  if (isFirstPane) {
    isDisabled = !isNextable
  } else if (isLastPane) {
    isDisabled = !isSubmittable
  } else if (isSubmitting) {
    isDisabled = true
  }

  return <section className="PaneControls">
    <div className="--button-container">
        <FadedBgButton
          buttonText={'BACK'} 
          buttonTextPosition={buttonTextPosition}
          onClick={(e) => {
            e.preventDefault()
            pane > FIRST_PANE && setPane(pane - 1)          
          }}
          isDisabled={pane === FIRST_PANE}
          width={buttonWidth}
        />
      </div>
      <div className="--button-container">
        <FadedBgButton    
          buttonText={pane < LAST_PANE ? 'NEXT' : determineSubmitButtonText()} 
          buttonTextPosition={buttonTextPosition}
          onClick={(e) => {
            e.preventDefault() 
            if (isFirstPane && isNextable) {
              setPane(pane + 1)
            }
            if (isLastPane && isSubmittable) {
              determineSubmitButtonFunc()
            }
          }}
          isDisabled={isDisabled}
          isFlipped
          width={buttonWidth}
        />
      </div>
  </section>
}