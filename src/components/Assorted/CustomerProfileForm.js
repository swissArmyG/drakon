/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext, CustomerContext } from '../../contexts'
import { containsMissingFields } from '../../utils/validation'
import { DetailedInput, SingleSelect } from './Inputs'

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
        <DetailedInput
          containerClassName="--mr-2p"
          id="firstname"
          inputClassName={`${isInvalid('firstname')}`}
          placeholder="Firstname"
          value={customerProfile?.firstname}
          onChange={(value) => onChange({ firstname: value })}
        />
        <DetailedInput
          id="lastname"
          inputClassName={`${isInvalid('lastname')}`}
          placeholder="Lastname"
          value={customerProfile?.lastname}
          onChange={(value) => onChange({ lastname: value })}
        />
      </div>

      <div className="row">
        <DetailedInput
          autoComplete={true}
          containerClassName="--mr-2p --mb-50px"
          id="email"
          inputClassName={`${isInvalid('email')}`}
          label="Email"
          placeholder="Please use a valid email"
          value={customerProfile?.email}
          onChange={(value) => onChange({ email: value })}
        />
        <DetailedInput
          id="phone"
          label="Phone"
          subLabel="Number Only"
          placeholder="No dash (-) or dot (.) required"
          inputClassName={`${isInvalid('phoneNumber')}`}
          value={customerProfile?.phoneNumber}
          onChange={(value) => onChange({ phoneNumber: value })}
        />
      </div>

      <SingleSelect 
        isSelected={customerProfile?.isConsented || false}
        option={"By checking this box, you acknowledge that the information provided is accurate and complete to the best of your ability. You consent to the terms and conditions of POMS, its affiliates and partners"}
        selectOption={() => {
          onChange({ isConsented: !customerProfile?.isConsented })
        }}
      />
    </section>
  )
}