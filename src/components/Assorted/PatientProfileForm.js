/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, NotificationContext, PatientContext } from '../../contexts'
import { 
  readPatientByUserId
} from '../../api/patients'
import { containsMissingFields } from '../../utils/validation'

export const PatientProfileForm = () => {
  const { isAuthenticated, userData } = useContext(AuthContext)
  const { setNotification } = useContext(NotificationContext)
  const { 
    isRegistering,
    patientProfile,
    setIsRegistering,
    setPatientProfile,
    setOriginalPatientProfile
  } = useContext(PatientContext)

  const navigate = useNavigate()
  const [ missingFields, setMissingFields ] = useState([])

  const readPatient = async () => {
    try {
      const data = await readPatientByUserId(userData?.id)
      onChange({ ...data, phoneNumber: data.phone_number })
      setOriginalPatientProfile(data)
    } catch (err) {
      setNotification({
        type: 'error',
        message: 'Something went wrong while loading your profile. Please refresh browser or try again later.'
      }) 
    }
  }

  useEffect(() => {  
    if ((userData?.email && userData?.id)) {
      !patientProfile && readPatient()
    }
  }, [userData?.id, userData?.email, setNotification])

  useEffect(() => {
    if (isRegistering) {
      const _missingFields = containsMissingFields({
        payload: patientProfile,
        requiredFields: ['firstname', 'lastname', 'email', 'phoneNumber']
      })

      setMissingFields(_missingFields.length > 0 ? _missingFields : undefined)
    }
  }, [patientProfile, isRegistering])

  const login = () => {
    navigate("/login")
  }

  const register = () => {
    if (!isRegistering) {
      const _missingFields = containsMissingFields({
        payload: patientProfile || {},
        requiredFields: ['firstname', 'lastname', 'email', 'phoneNumber']
      })

      console.log('missingFields:', missingFields)
  
      setMissingFields(_missingFields.length > 0 ? _missingFields : undefined)
      setIsRegistering(true)

      _missingFields.length === 0 && navigate("/register")
    }
  }

  const isInvalid = useCallback((field) => {
    return missingFields?.length > 0 && missingFields.includes(field) ? '--invalid' : ''
  }, [missingFields])

  const onChange = (data) => {
    setPatientProfile({ ...patientProfile, ...data })
  }
  
  return ( 
    <section className="PatientProfileForm">
      { !isAuthenticated && <p className="--login-nav">Please <u><em onClick={() => login()}>login</em></u> to automatically fill out the following details, or <u><em onClick={() => register()}>register</em></u> and save time at the next login</p> }

      <p><em>Patient's Full Name</em>
       
        {missingFields?.length > 0 && 
          <span className="--required">
            <i>
              <sup>*</sup>
              Required fields
            </i>
          </span>}
      </p>

      <div className="row">
        <div className="--input-container --mr-2">
          <input type="text"
            id="firstname"
            placeholder="Firstname"
            className={`${isInvalid('firstname')}`}
            value={patientProfile?.firstname || ""}
            onChange={({ target: { value }}) => onChange({ firstname: value })}
          />
        </div>
        <div className="--input-container">
          <input type="text"
            id="lastname"
            placeholder="Lastname"
            className={`${isInvalid('lastname')}`}
            value={patientProfile?.lastname || ""}
            onChange={({ target: { value }}) => { 
              onChange({ lastname: value })
            }}
          />
        </div>
      </div>

      <div className="--address-input-container">
        <p><em>Address</em><span>Optional</span></p>
        <input type="text"
          id="address"
          value={patientProfile?.address || ""}
          onChange={({ target: { value }}) => onChange({ address: value })}
        />
      </div>

      <div className="row">
        <div className="--input-container --mr-2">
          <p><em>Email</em></p>
          <input type="text"false
            id="email"
            autoComplete="on"
            placeholder="Please use a valid email"
            className={`${isInvalid('email')}`}
            value={patientProfile?.email || ""}
            onChange={({ target: { value }}) => onChange({ email: value })}
          />
        </div>
        <div className="--input-container">
          <p><em>Phone</em><span>Number Only</span></p>
          <input type="number"
            id="phone"
            placeholder="No dash (-) or dot (.) required"
            className={`${isInvalid('phoneNumber')}`}
            value={patientProfile?.phoneNumber || ""}
            onChange={({ target: { value }}) => onChange({ phoneNumber: value })} 
          />
        </div>
      </div>
    </section>
  )
}