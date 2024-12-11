import React, { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { FadedBgButton } from '../Buttons'
import { 
  createCustomer, 
  updateCustomer, 
  requestNewConsultation
} from "../../api/customers"
import { AuthContext, NotificationContext, CustomerContext } from "../../contexts"

export const PAGE_VARIABLES = {
  INCOMPLETE: 0,
  FIRST_PAGE: 1,
  LAST_PAGE: 7
}

export const PageControls = ({ windowWidth, scrollToFormTop }) => {
  const { 
    FIRST_PAGE,
    LAST_PAGE 
  } = PAGE_VARIABLES

  const navigate = useNavigate()
  const { userData } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const { 
    isRegisterClicked,
    originalCustomerProfile,
    customerProfile,
    page,
    resetForm,
    setPage,
    stepsCompleted,
    validateForm
  } = useContext(CustomerContext)

  const customerId = customerProfile?.id  

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
    if (customerId) {
      try {
        await requestNewConsultation(customerId)
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
  
    if (customerId) {
      try {
        await updateCustomer({
          customerId,
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
        await createCustomer(customerProfile)
  
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
        // IF USE OLD EMAIL: update changed fields w old email
        // IF USE NEW EMAIL: update changed fields w new email
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
  
  const isFirstPage = page === FIRST_PAGE
  const isLastPage = page === LAST_PAGE

  const isNextable = stepsCompleted >= page
  const isSubmittable = isLastPage && stepsCompleted === LAST_PAGE

  let isDisabled = false;
  if (page < LAST_PAGE) {
    isDisabled = !isNextable
  } else if (isLastPage) {
    isDisabled = !isSubmittable
  } else if (isSubmitting) {
    isDisabled = true
  }

  return <section className="PageControls row">
    <div className="--button-container">
      <FadedBgButton
        buttonText={'BACK'} 
        buttonTextPosition={buttonTextPosition}
        onClick={(e) => {
          e.preventDefault()
          setPage(page <= 1 ? 1 : page - 1)
        }}
        isDisabled={isFirstPage}
        width={buttonWidth}
      />
    </div>
    <div className="--button-container">
      <FadedBgButton    
        buttonText={page < LAST_PAGE ? 'NEXT' : determineSubmitButtonText()} 
        buttonTextPosition={buttonTextPosition}
        onClick={(e) => {
          e.preventDefault()  
          if (isNextable) {
            setPage(page + 1)
            validateForm(false)
          } else {
            validateForm(true)
          }

          if (isLastPage && isSubmittable) {
            determineSubmitButtonFunc()
          }
          
          scrollToFormTop()
        }}
        isDisabled={isDisabled}
        isFlipped
        width={buttonWidth}
      />
    </div>
  </section>
}