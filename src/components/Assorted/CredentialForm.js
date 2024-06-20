import { useState } from 'react'
import { FadedBgButton  } from '../Buttons'
import { containsMissingFields } from '../../uitls/validation'

export const CredentialForm = ({
  credentials,
  isLoading,
  onChange, 
  onSubmit,
  placeholderText=[undefined, undefined],
  requiredFields=[],
  submitButtonText
}) => {
  const [ isPasswordVisible, setIsPasswordVisible ] = useState(false)

  const isInvalid = credentials && containsMissingFields({
    payload: credentials,
    requiredFields
  })

  const isSubmittable = !isInvalid;

  return (
    <section className="CredentialForm">
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
          onSubmit()         
        }}
        isDisabled={!isLoading && !isSubmittable}
      />
    </section>
  )
}