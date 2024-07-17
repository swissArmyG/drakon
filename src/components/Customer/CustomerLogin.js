/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CredentialForm } from '../Assorted'
import { AuthContext, NotificationContext } from '../../contexts'
import { forgotPassword, login } from '../../api/sessions'

export const CustomerLogin = () => {
  const {
    loginPayload,
    setUserData,
    setLoginPayload 
  } = useContext(AuthContext)

  const navigate = useNavigate()
  const { setNotification } = useContext(NotificationContext)
  const [ isSubmitting, setIsLoading ] = useState(false)
  const [ isForgettingPassword, setIsForgettingPassword ] = useState(false)

  const clearAndClose = () => {
    setLoginPayload({ email: '', password: '' })
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
      navigate("/")

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

  return (
    <section className={`CustomerLogin --container --background`}>
      <CredentialForm 
        credentials={loginPayload}
        isSubmitting={isSubmitting}
        onChange={(updates) => setLoginPayload({ ...loginPayload, ...updates })}
        onSubmit={onSubmit}
        submitButtonText={"LOGIN"}
        requiredFields={['email', 'password']}
        footer={
          <React.Fragment>
            { 
              loginPayload.email && 
              <span className={`--button --button-text --forgot-password ${isForgettingPassword ? 'isDisabled' : ''}`}
                onClick={onForgotPassword}>
                Forgot your password ?
              </span>
            }
            <span className="--button --button-text" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-arrow-left-long" />
              Return to previous page
            </span>
            </React.Fragment>
          }
      />
    </section>
  )
}