import { useContext, useState } from 'react'
import { CredentialForm } from '../Assorted'
import { forgotPassword, login } from '../../api/sessions'
import { AuthContext, NotificationContext } from '../../contexts'

export const Login = ({ isOpen, toggleOpen }) => {
  const {
    loginPayload,
    setUserData,
    setLoginPayload 
  } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const [ isSubmitting, setIsLoading ] = useState(false)
  const [ isForgettingPassword, setIsForgettingPassword ] = useState(false)

  const clearAndClose = () => {
    setLoginPayload({ email: '', password: '' })
    toggleOpen(false)
  }

  const onSubmit = async() => {
    setIsLoading(true)

    try {
      const userData = await login({
        email: loginPayload.email,
        password: loginPayload.password
      })

      setUserData({ id: userData.id, email: userData.email })

      setNotification({
        type: 'success',
        message: 'Successfully logged in.'
      })

      clearAndClose()
    } catch (err) {
      setNotification({ 
        type: 'error', 
        message: 'Invalid email or password.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onForgotPassword = async () => {
    setIsForgettingPassword(true)

    try {
      await forgotPassword(loginPayload.email)

      setNotification({
        type: 'success',
        message: `The password reset link has been sent to ${loginPayload.email}. If this email is already registered with us, please follow the email instruction to continue.`
      })

      clearAndClose()
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please check your email address, or try again later.'
      })
    } finally {
      setIsForgettingPassword(false)
    }
  }

  return isOpen && <section className="Login">
    <div className="--modal">
      <div>
        <h3 className="--button --button-text -exit" 
          onClick={() => clearAndClose()}>
          X
        </h3>
      </div>

      <CredentialForm 
        credentials={loginPayload}
        isSubmitting={isSubmitting}
        onChange={(updates) => setLoginPayload({ ...loginPayload, ...updates })}
        onSubmit={onSubmit}
        submitButtonText={"LOGIN"}
        requiredFields={['email', 'password']}
      />

      {
        loginPayload.email && 
        <span className={`--button --button-text ${isForgettingPassword ? 'isDisabled' : ''}`}
          onClick={onForgotPassword}>
          Forgot your password ?
        </span>
      }
    </div>
  </section>
}