import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CredentialForm } from './CredentialForm'
import { Notification } from './Notification'
import { 
  renderResetPassword, 
  resetPassword 
} from '../../api/sessions'

export const PasswordReset = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tokenParam = queryParams.get('token')
  const userIdParam = queryParams.get('userId')

  const defaultResetPayload = {
    email: '',
    userId: userIdParam,
    token: tokenParam,
  }
  const [ notification, setNotification ] = useState({
    type: '',
    message: ''
  })
  const [ resetPayload, setResetPayload ] = useState(defaultResetPayload)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  const { token, userId } = resetPayload

  useEffect(() => {
    const requestResetPassword = async () => {
      try {
        await renderResetPassword({ token: resetPayload.token, userId: resetPayload.userId })
        setIsAuthenticated(true)
      } catch (err) {
        navigate("/")
        setIsAuthenticated(false)
        setNotification({
          type: 'error',
          message: 'Something went wrong. Please make sure the reset password link has not expired, or try again later.'
        })
      }
    };
  
    if (resetPayload.token && resetPayload.userId) {
      requestResetPassword()
    }
  }, [resetPayload, navigate])

  const clearAndClose = () => {
    setResetPayload(defaultResetPayload)
  }

  const onSubmit = async() => {
    setIsSubmitting(true)

    try {
      if (!userId || !token) {
        setNotification({
          type: 'error', 
          message: 'Please make sure your reset password link has not expired, or try again later.'
        })
      }

      await resetPassword({
        password: resetPayload.password,
        userId,
        token
      })

      setNotification({
        type: 'success', 
        message: 'Successfully reset password.'
      })

      clearAndClose()
    } catch (err) {
      setNotification({
        type: 'error', 
        message: 'Something went wrong. Please make sure that your email is correct, or try again later.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`PasswordReset --container --background`}>
      {!isAuthenticated
      ? <p>The link may have already expired. Please <em onClick={() => navigate("/")}>return to homepage</em> and request another password reset</p>
      : <CredentialForm 
        credentials={resetPayload}
        isSubmitting={isSubmitting}
        onChange={(payload) => setResetPayload({ ...resetPayload, ...payload })}
        onSubmit={onSubmit}
        placeholderText={[
          "Please confirm your current email",
          "Enter the new password"
        ]}
        requiredFields={['password', 'userId', 'token']}
        submitButtonText={"CONFIRM"}
      />}
      <Notification 
        type={notification.type}
        message={notification.message}
      />
    </section>
  )
}