/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CredentialForm } from './CredentialForm'
import { NotificationContext, PatientContext } from '../../contexts'
import { createPatient } from '../../api/patients'

export const PatientRegister = () => {
  const navigate = useNavigate()

  const {
    patientProfile, 
    painDegree, 
    painDescriptions,
    resetForm
  } = useContext(PatientContext)

  const defaultRegisterPayload = {
    password: '',
    email: ''
  }

  const { setNotification } = useContext(NotificationContext)
  const [ registerPayload, setRegisterPayload ] = useState(defaultRegisterPayload)
  const [ isSubmitting, setIsSubmitting ] = useState(false)

  const onSubmit = async() => {
    setIsSubmitting(true)

    if (patientProfile && registerPayload.password) {
      try {
        await createPatient({
          firstname: patientProfile.firstname,
          lastname: patientProfile.lastname,
          pain_description: painDescriptions,
          pain_degree: painDegree,
          address: patientProfile.address,
          email: patientProfile.email,
          phone_number: patientProfile.phoneNumber,
          password: registerPayload.password
        })
        setNotification({
          type: 'success', 
          message: 'Thank you for requesting a consultation with us. You are now registered on PeaceofMindSpine.COM (POMS). The doctor will contact you soon according to the email and phone number you provided.'
        })
        setRegisterPayload(defaultRegisterPayload)
        resetForm()
      } catch (err) {

        console.log('err:', err)
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
    <section className={`PatientRegister --container --background`}>
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
        header={<p className='--instruction'>Please provide a password for your new account. For your convenience, the doctor will be informed about your consultation request, upon registraion with this email <em>{patientProfile.email}</em></p>}
        footer={
          <span className="--button --button-text" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left-long" />
            Return to previous page
          </span>
        }
      />
    </section>
  )
}