import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { CredentialForm } from './CredentialForm'
import { Notification } from './Notification'
import { 
  renderResetPassword, 
  resetPassword 
} from '../../api/sessions'

export const PasswordReset = () => {
  // const { token, userId } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const userId = queryParams.get('userId')

  // const navigate = useNavigate()

  const defaultState = {
    email: '',
    userId: '',
    token: '',
  }
  const [ notification, setNotification ] = useState({
    type: '',
    message: ''
  })
  const [ resetPayload, setResetPayload ] = useState(defaultState)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  // const [ isValid, setIsValid ] = useState(false)

  const requestResetPassword = useCallback(async () => {    
    try {
      await renderResetPassword({ token, userId })
      // setIsValid(true)
    } catch (err) {
      // setIsValid(false)
      // navigate("/")
      setNotification({
        type: 'error',
        message: 'Something went wrong. Please make sure the reset password link has not expired, or try again later.'
      })
    }
  }, [token, userId])

  useEffect(() => {
    requestResetPassword()
  }, [requestResetPassword])

  const clearAndClose = () => {
    setResetPayload(defaultState)
  }

  const onSubmit = async() => {
    setIsSubmitting(true)

    try {
      if (!userId || !token) {
        throw new Error('Invalid link')
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
      // navigate("/")
      setNotification({
        type: 'error', 
        message: 'Something went wrong. Maybe your link has expired. Please try again'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="PasswordReset">
      {(!token || !userId) 
      ? <h1>Invalid token</h1>
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