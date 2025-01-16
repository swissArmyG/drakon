import React, { useContext } from "react"
import { FadedBgButton } from '../Buttons'
import { CustomerContext } from "../../contexts"

export const PAGE_VARIABLES = {
  INCOMPLETE: 0,
  FIRST_PAGE: 1,
  LAST_PAGE: 7
}

export const PageControls = ({ navigateToFormPage, onSubmit, scrollToFormTop, windowWidth }) => {
  const { 
    FIRST_PAGE,
    LAST_PAGE 
  } = PAGE_VARIABLES

  const { 
    isSubmitting,
    page,
    stepsCompleted,
    validateForm
  } = useContext(CustomerContext)

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
          navigateToFormPage(prevPage)
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
            navigateToFormPage(nextPage)
            validateForm(false)
          } else {
            validateForm(true)
          }

          if (isLastPage && isSubmittable) {
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