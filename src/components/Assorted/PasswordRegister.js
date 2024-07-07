/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CredentialForm } from './CredentialForm'
import { NotificationContext } from '../../contexts'
import { createPatient } from '../../api/patients'

export const PasswordRegister = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location;
  const { patientProfile } = state || {};


  const defaultRegisterPayload = {
    password: '',
    email: patientProfile.email
  }

  const { setNotification } = useContext(NotificationContext)
  const [ registerPayload, setRegisterPayload ] = useState(defaultRegisterPayload)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  useEffect(() => {
    if (!patientProfile.email) {
      navigate("/")
    }
  }, [patientProfile.email])

  const clearAndClose = () => {
    setRegisterPayload(defaultRegisterPayload)
    navigate("/")
  }

  const onSubmit = async() => {
    setIsSubmitting(true)

    if (registerPayload.password && registerPayload.email) {
      try {
        await createPatient({
          firstname: patientProfile.firstname,
          lastname: patientProfile.lastname,
          pain_description: patientProfile.painDescriptions,
          pain_degree: patientProfile.painDegree,
          address: patientProfile.address,
          email: patientProfile.email,
          phone_number: patientProfile.phoneNumber,
          password: registerPayload.password
        })
        setNotification({
          type: 'success', 
          message: 'Thank you for requesting a consultation with us. You are now registered on PeaceofMindSpine.COM (POMS). The doctor will contact you soon according to the email and phone number you provided.'
        })
        clearAndClose()
      } catch (err) {
        setNotification({
          type: 'error', 
          message: 'Something went wrong, please try again later.'
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <section className={`PasswordRegister --container --background`}>
      <CredentialForm 
        credentials={{ password: registerPayload.password }}
        isSubmitting={isSubmitting}
        onChange={(payload) => setRegisterPayload({ ...registerPayload, ...payload })}
        onSubmit={onSubmit}
        placeholderText={[
          "",
          "Your new account password"
        ]}
        requiredFields={["password"]}
        submitButtonText={"REGISTER"}
      >
        <p className='--instruction'>Please provide a password for your new account. For your convenience, the doctor will be informed about your consultation request, upon registraion with this email <em>{patientProfile.email}</em></p>
      </CredentialForm>
    </section>
  )
}