/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, CustomerContext } from '../../contexts'
import { containsMissingFields } from '../../utils/validation'
import { SingleSelect } from './Inputs/SingleSelect'

export const CustomerProfileForm = () => {
  const { isAuthenticated } = useContext(AuthContext)

  const { 
    isRegisterClicked,
    customerProfile,
    setIsRegisterClicked,
    setCustomerProfile
  } = useContext(CustomerContext)

  const navigate = useNavigate()
  const [ missingFields, setMissingFields ] = useState([])

  const checkForMissingFields = () => {
    const _missingFields = containsMissingFields({
      payload: customerProfile,
      requiredFields: ['firstname', 'lastname', 'email', 'phoneNumber']
    })

    setMissingFields(_missingFields)
  }

  useEffect(() => {
    // Check for missing fields only after "register" has been clicked
    if (isRegisterClicked) {
      checkForMissingFields()
    }
  }, [customerProfile, isRegisterClicked])

  const login = () => {
    navigate("/login")
  }

  const register = () => {
    checkForMissingFields()
    setIsRegisterClicked(true)
  }

  const isInvalid = useCallback((field) => {
    return missingFields.length > 0 && missingFields.includes(field) ? '--invalid' : ''
  }, [missingFields])

  const onChange = (data) => {
    setCustomerProfile({ ...customerProfile, ...data })
  }
  
  return ( 
    <section className="CustomerProfileForm">
      { !isAuthenticated && <p className="--login-nav">Please <u><em onClick={() => login()}>login</em></u> to automatically fill out the following details, or <u><em onClick={() => register()}>register</em></u> and save time at the next login</p> }

      <p><em>Full Name</em>
       
        {missingFields.length > 0 && 
          <span className="--required">
            <i>
              <sup>*</sup>
              Required fields
            </i>
          </span>}
      </p>

      <div className="row">
        <div className="--input-container --mr-2p">
          <input type="text"
            id="firstname"
            placeholder="Firstname"
            className={`${isInvalid('firstname')}`}
            value={customerProfile?.firstname || ""}
            onChange={({ target: { value }}) => onChange({ firstname: value })}
          />
        </div>
        <div className="--input-container">
          <input type="text"
            id="lastname"
            placeholder="Lastname"
            className={`${isInvalid('lastname')}`}
            value={customerProfile?.lastname || ""}
            onChange={({ target: { value }}) => { 
              onChange({ lastname: value })
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="--input-container --mr-2p --mb-2">
          <p><em>Email</em></p>
          <input type="text"
            id="email"
            autoComplete="on"
            placeholder="Please use a valid email"
            className={`${isInvalid('email')}`}
            value={customerProfile?.email || ""}
            onChange={({ target: { value }}) => onChange({ email: value })}
          />
        </div>
        <div className="--input-container">
          <p><em>Phone</em><span>Number Only</span></p>
          <input type="number"
            id="phone"
            placeholder="No dash (-) or dot (.) required"
            className={`${isInvalid('phoneNumber')}`}
            value={customerProfile?.phoneNumber || ""}
            onChange={({ target: { value }}) => onChange({ phoneNumber: value })} 
          />
        </div>
      </div>

      <SingleSelect 
        isSelected={customerProfile?.isConsented || false}
        option={"By checking this box, you acknowledge that the information provided is accurate and complete to the best of your ability. You consent to the terms and conditions of POMS, its affiliates and partners"}
        selectOption={() => {
          onChange({ isConsented: !customerProfile.isConsented })
        }}
      />
    </section>
  )
}