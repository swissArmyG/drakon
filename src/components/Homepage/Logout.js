import { useContext, useState } from 'react'
import { AuthContext, CustomerContext, NotificationContext } from '../../contexts'
import { FadedBgButton } from '../Buttons'
import { logout } from '../../api/sessions'

export const Logout = ({ isOpen, toggleOpen }) => {
  const {
    setLoginPayload,
    setUserData,
    userData 
  } = useContext(AuthContext)
  const { setCustomerProfile } = useContext(CustomerContext)
  const { setNotification } = useContext(NotificationContext)
  const [ isLoading, setIsLoading ] = useState(false)

  const clearAndClose = () => {
    setLoginPayload({ email: '', password: ''})
    toggleOpen(false)
  }

  const onSubmit = async() => {
    setIsLoading(true)

    try {
      await logout(userData.id)
      
      setUserData(undefined)
      setCustomerProfile(undefined)
      setNotification({ 
        type: 'success', 
        message: 'Successfully logged out.'
      })

      clearAndClose()
    } catch (err) {
      setNotification({ 
        type: 'error', 
        message: 'Unable to logout at the moment, please try again later.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return isOpen && <section className="Logout">
    <div className="--modal">
      <div>
        <h3 className="--button --button-text -exit" 
          onClick={() => toggleOpen(false)}>
          X
        </h3>
      </div>

      <FadedBgButton
        buttonText={'LOGOUT'}
        buttonTextPosition={'24%'}
        onClick={(e) => {
          e.preventDefault()
          onSubmit()         
        }}
        isDisabled={isLoading}
      />
    </div>
  </section>
}