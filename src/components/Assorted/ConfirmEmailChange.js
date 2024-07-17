import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext, NotificationContext, CustomerContext } from "../../contexts"
import { FadedBgButton } from "../Buttons"
import { updateCustomer } from '../../api/customers' 

export const ConfirmEmailChange = () => {
  const { userData } = useContext(AuthContext)
  const { 
    customerProfile, 
    resetForm, 
    setCustomerProfile 
  } = useContext(CustomerContext)
  const { setNotification } = useContext(NotificationContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location
  const { email } = state

  const _updateCustomer = async() => {
    try {
      await updateCustomer({
        customerId: customerProfile.id,
        payload: customerProfile
      }) 
      resetForm()
    } catch (err) {
      setNotification({
        typpe: "error",
        message: "Something went wrong. We are unable to update your information at the moment. Please try again later."
      })
    }
  }

  const returnPreviousEmail = () => {
    setCustomerProfile({ ...customerProfile, email: userData.email })
    navigate(-1)
  }
  
  return (
    <section className={`ConfirmEmailChange --background`}>
      <div className="--container ">
        <p>(<em>{`${email}`}</em>) is a new and different email than the one you provided on our existing record. Using this email will also <i>change the email you use for login.</i> Would you like to continue with the new email ?</p>

        <div className="--action-container">
          <FadedBgButton
            buttonText={"Use the new email"}
            buttonTextPosition={'24%'}
            width={"400px"}
            onClick={(e) => {
              e.preventDefault()
              if (customerProfile) {
                _updateCustomer()
              }
            }}
          />
          
          <span className="--button --button-text" onClick={() => returnPreviousEmail()}>
            <i className="fa-solid fa-arrow-left-long" />
            {`Use the old email ${userData?.email || ""}`}
          </span>
        </div>
      </div>
    </section>
  )
}