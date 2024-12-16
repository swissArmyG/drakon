import React, { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { FadedBgButton } from '../Buttons'
import { CustomerContext } from "../../contexts"

export const PAGE_VARIABLES = {
  INCOMPLETE: 0,
  FIRST_PAGE: 1,
  LAST_PAGE: 7
}

export const PageControls = ({ onSubmit, scrollToFormTop, windowWidth }) => {
  const { 
    FIRST_PAGE,
    LAST_PAGE 
  } = PAGE_VARIABLES

  const navigate = useNavigate()
  // const { userData } = useContext(AuthContext)
  const { 
    // originalCustomerProfile,
    isSubmitting,
    page,
    setPage,
    stepsCompleted,
    validateForm
  } = useContext(CustomerContext)

  // const customerId = customerProfile?.id  

  // const getChangedFields = () => {
  //   const changedFields = {}

  //   Object
  //     .keys(customerProfile)
  //     .forEach(key => {
  //       if (customerProfile[key] !== originalCustomerProfile[key]) {
  //         changedFields[key] = customerProfile[key]
  //       }
  //     })

  //   return changedFields
  // }

  // const requestExistingAccountConsultation = async () => {
  //   if (customerId) {
  //     try {
  //       await requestNewConsultation(customerId)
  //       resetForm()
  //     } catch (err) {
  //       setNotification({
  //         type: 'error',
  //         message: 'Something went wrong while requesting a new consultation. Please try again later.'
  //       })
  //     }
  //   }
  // }

  // const requestExistingAccountUpdateConsultation = async () => {
  //   const changedFields = getChangedFields()
  
  //   if (customerId) {
  //     try {
  //       await updateCustomer({
  //         customerId,
  //         payload: changedFields
  //       })
  //       resetForm()
  //     } catch (err) {
  //       setNotification({
  //         type: "error",
  //         message: "Something went wrong. We are unable to update your information at the moment. Please try again later."
  //       })
  //     }
  //   }
  // }

  // const requestConsultation = {
  //   existingAccount: {
  //     request: () => requestExistingAccountConsultation(),
  //     update: (payload) => requestExistingAccountUpdateConsultation(payload)
  //   },
  //   newAccount: {
  //     register: () => navigate("/register")
  //   },  
  //   nonAccount: () => requestNonAccountConsultation()
  // }

  // const determineExistingAccountConsultation = () => {
  //    const changedFields = getChangedFields()

  //    if (Object.keys(changedFields) > 0) {
  //       requestConsultation.existingAccount.update(changedFields)
  //    } else {
  //       requestConsultation.existingAccount.request()
  //    }
  // }

  // const determineSubmitButtonText = () => {
  //   return (!userData && isRegisterClicked) 
  //     ? 'REGISTER' 
  //     : 'SUBMIT'
  // }

  // const determineSubmitButtonFunc = () => {
  //   if (userData) {
  //     // CONFIRMATION REQUIRED: if the user account already exists
  //       // IF USE OLD EMAIL: update changed fields w old email
  //       // IF USE NEW EMAIL: update changed fields w new email
  //     userData.email !== customerProfile.email
  //       ?  navigate("/confirm", {
  //         state: { 
  //           email: customerProfile.email
  //         }
  //       })
  //       : determineExistingAccountConsultation()
  //   } else {
  //     isRegisterClicked
  //       ? requestConsultation.newAccount.register()
  //       : requestConsultation.nonAccount()
  //   }
  // }

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

          const prevPage = page <= FIRST_PAGE ? FIRST_PAGE : page -1
          setPage(prevPage)
          // TODO: navigate(`/?page=${prevPage}`)
        }}
        isDisabled={isFirstPage}
        width={buttonWidth}
      />
    </div>
    <div className="--button-container">
      <FadedBgButton    
        buttonText={page < LAST_PAGE ? 'NEXT' : 'SUBMIT'} 
        buttonTextPosition={buttonTextPosition}
        onClick={(e) => {
          e.preventDefault()

          if (isNextable) {
            const nextPage = page < LAST_PAGE ? page + 1 : page
            setPage(nextPage)
            // TODO: navigate(`/?page=${nextPage}`)

            validateForm(false)
          } else {
            validateForm(true)
          }

          if (isLastPage && isSubmittable) {
            // determineSubmitButtonFunc()
            // requestConsultation.existingAccount.request() 
            onSubmit()
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