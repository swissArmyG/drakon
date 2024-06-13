import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CredentialForm } from './CredentialForm'
import { Notification } from './Notification'
import { resetPassword } from '../../api/sessions'

export const PasswordReset = () => {
  const defaultState = {
    email: '',
    userId: '',
    token: '',
  }

  const { userId, token } = useParams({})
  const [ notification, setNotification ] = useState({
    type: '',
    message: ''
  })
  const [ resetPayload, setResetPayload ] = useState(defaultState)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
    
  const clearAndClose = () => {
    setResetPayload(defaultState)
  }

  const onSubmit = async() => {
    setIsSubmitting(true)

    try {
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
        message: 'Something went wrong, please try again'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="PasswordReset">
      <CredentialForm 
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
      />

      <Notification 
        type={notification.type}
        message={notification.message}
      />
    </section>
  )
}