import { useState } from 'react'
import { CredentialForm } from '../Assorted/CredentialForm'
import { forgotPassword, login } from '../../api/sessions'

export const Login = ({ isOpen, toggleOpen, notify, setUserData }) => {
  const [ isSubmitting, setIsLoading ] = useState(false)
  const [ isForgettingPassword, setIsForgettingPassword ] = useState(false)
  const [ loginPayload, setLoginPayload ] = useState({
    email: '',
    password: ''
  })

  const clearAndClose = () => {
    setLoginPayload({ email: '', password: '' })
    toggleOpen(false)
  }

  const onSubmit = async() => {
    setIsLoading(true)

    try {
      const { data } = await login({
        email: loginPayload.email,
        password: loginPayload.password
      })

      setUserData(data)

      notify({ 
        type: 'success', 
        message: 'Successfully logged in.'
      })

      clearAndClose()
    } catch (err) {
      notify({ 
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

      notify({
        type: 'success',
        message: `The password reset link has been sent to ${loginPayload.email}. If this email is already registered with us, please follow the email instruction to continue.`
      })

      clearAndClose()
    } catch (err) {
      notify({
        type: 'error',
        message: 'Something went wrong. Please check your email address or try again later.'
      })
    } finally {
      setIsForgettingPassword(false)
    }
  }

  return isOpen && <section className="Login">
    <div className="--modal">
      <div>
        <h3 className="--button --button-text -exit" 
          onClick={() => toggleOpen(false)}>
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