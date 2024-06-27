import { useContext, useState } from 'react'
import { AuthContext, NotificationContext } from '../../contexts'
import { FadedBgButton } from '../Buttons'

export const Logout = ({ isOpen, toggleOpen }) => {
  const {
    setLoginPayload 
  } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)

  const [ isLoading, setIsLoading ] = useState(false)

  const clearAndClose = () => {
    setLoginPayload(false)
    toggleOpen(false)
  }

  const onSubmit = async() => {
    setIsLoading(true)

    try {
      setNotification({ 
        type: 'success', 
        message: 'Successfully logged in.'
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