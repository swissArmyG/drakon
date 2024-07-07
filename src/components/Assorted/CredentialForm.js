import { useEffect, useState } from 'react'
import { FadedBgButton  } from '../Buttons'
import { containsMissingFields } from '../../utils/validation'

export const CredentialForm = ({
  credentials,
  children,
  isLoading,
  onChange, 
  onSubmit,
  placeholderText=[undefined, undefined],
  requiredFields=[],
  submitButtonText
}) => {
  const [ isSubmittable, setIsSubmittable ] = useState(false)
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)

  useEffect(() => {
    const missingFields = credentials && containsMissingFields({
      payload: credentials,
      requiredFields
    })

    setIsSubmittable(missingFields.length === 0)
  }, [credentials, requiredFields])

  const attributes = Object.keys(credentials)

  return (
    <section className="CredentialForm">
      { children && children }
      { attributes.includes('email') && 
        <div className="--input-container">
          <input
            id="email" 
            type="text"
            autoComplete="on"
            placeholder={placeholderText[0] || "Email"}
            value={credentials.email || ""}
            onChange={({ target: { value }}) => onChange({ email: value })}
          />
        </div>
      }

      <div className="--input-container">
        <input
          id="password" 
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={placeholderText[1] || "Password"}
          value={credentials.password || ""}
          onChange={({ target: { value }}) => onChange({ password: value })}
        />

      {
        isPasswordVisible
        ? <i className="fa-regular fa-eye-slash" 
          onClick={() => setIsPasswordVisible(false)} /> 
        : <i className="fa-regular fa-eye" 
          onClick={() => setIsPasswordVisible(true)}/>
      }
      </div>
      
      <FadedBgButton
        buttonText={submitButtonText}
        buttonTextPosition={'24%'}
        onClick={(e) => {
          e.preventDefault()
          isSubmittable && onSubmit()         
        }}
        isDisabled={isLoading || !isSubmittable}
      />
    </section>
  )
}