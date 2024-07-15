import React, { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { FadedBgButton } from '../Buttons'
import { 
  createCustomer, 
  updateCustomer, 
  requestNewConsultation
} from "../../api/customers"
import { AuthContext, NotificationContext, CustomerContext } from "../../contexts"

export const PANE_VARIABLES = {
  INCOMPLETE: 0,
  FIRST_PANE: 1,
  SECOND_PANE: 2,
  THIRD_PANE: 3,
  FORTH_PANE: 4,
  FIFTH_PANE: 5,
  LAST_PANE: 6
}

export const PaneControls = ({ windowWidth }) => {
  const { FIRST_PANE, LAST_PANE } = PANE_VARIABLES

  const navigate = useNavigate()

  const { userData } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const { 
    isRegisterClicked,
    originalCustomerProfile,
    painDescriptions,
    painDegree,
    pane,
    customerProfile,
    resetForm,
    setPane,
    stepsCompleted
  } = useContext(CustomerContext)

  const patientId = customerProfile?.id  

  const getChangedFields = () => {
    const changedFields = {}

    Object
      .keys(customerProfile)
      .forEach(key => {
        if (customerProfile[key] !== originalCustomerProfile[key]) {
          changedFields[key] = customerProfile[key]
        }
      })

    return changedFields
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const requestExistingAccountConsultation = async () => {
    if (patientId) {
      try {
        await requestNewConsultation(patientId)
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
  
    if (patientId) {
      try {
        await updateCustomer({
          patientId,
          payload: changedFields
        })
        resetForm()
      } catch (err) {
        setNotification({
          type: "error",
          message: "Something went wrong. We are unable to update your information at the moment. Please try again later."
        })
      }
    }
  }

  const requestNonAccountConsultation = async () => {
    setIsSubmitting(true)

    if (customerProfile) {
      try {
        await createCustomer({        
          firstname: customerProfile.firstname,
          lastname: customerProfile.lastname,
          pain_description: painDescriptions,
          pain_degree: painDegree,
          address: customerProfile.address,
          email: customerProfile.email,
          phone_number: customerProfile.phoneNumber
        })
  
        setNotification({ 
          type: 'success', 
          message: 'You have requested a consultation! Our doctor will reach out to you soon via the email or the phone number you provided.'
        })

        resetForm()
      } catch (err) {
        setNotification({ 
          type: 'error', 
          message: 'Unable to make a consultation request currently, please try again later.'
        })
      } finally {
        setIsSubmitting(false)
      }
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
        requestConsultation.existingAccount.update(changedFields)
     } else {
        requestConsultation.existingAccount.request()
     }
  }

  const determineSubmitButtonText = () => {
    return (!userData && isRegisterClicked) 
      ? 'REGISTER' 
      : 'SUBMIT'
  }

  const determineSubmitButtonFunc = () => {
    if (userData) {
    // CONFIRMATION REQUIRED: if the user account already exists
      // USE OLD EMAIL: update changed fields w old email
      // USE NEW EMAIL: update changed fields w new email
      userData.email !== customerProfile.email
        ?  navigate("/confirm", {
          state: { 
            email: customerProfile.email
          }
        })
        : determineExistingAccountConsultation()
    } else {
      isRegisterClicked
        ? requestConsultation.newAccount.register()
        : requestConsultation.nonAccount()
    }
  }

  const buttonWidth = windowWidth > 613 ? "300px" : "160px"
  const buttonTextPosition = windowWidth > 613 ? undefined : "0%"
  
  const isFirstPane = pane === FIRST_PANE
  const isLastPane = pane === LAST_PANE

  const isNextable = stepsCompleted >= pane
  const isSubmittable = isLastPane && stepsCompleted === LAST_PANE

  let isDisabled = false;
  if (pane < LAST_PANE) {
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
            if (isNextable) {
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