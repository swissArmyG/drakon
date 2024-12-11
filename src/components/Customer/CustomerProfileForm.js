/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext, CustomerContext } from '../../contexts'
import { CustomerContext } from '../../contexts'
import { DetailedInput, SingleSelect } from '../Assorted/Inputs'

export const CustomerProfileForm = () => {
  // const { isAuthenticated } = useContext(AuthContext)
  const { 
    isInvalid,
    customerProfile,
    setCustomerProfile
  } = useContext(CustomerContext)

  const onChange = (data) => {
    setCustomerProfile({ ...customerProfile, ...data })
  }
  
  return ( 
    <section className="CustomerProfileForm">
      {/* { !isAuthenticated && <p className="--login-nav">Please <u><em onClick={() => login()}>login</em></u> to automatically fill out the following details, or <u><em onClick={() => register()}>register</em></u> and save time at the next login</p> } */}
      <p><em>Full Name</em></p>

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
          id="phoneNumber"
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
        additionalClassName={`${isInvalid('isConsented')}`}
        option={"By checking this box, you acknowledge that the information provided is accurate and complete to the best of your ability. You consent to the terms and conditions of POMS, its affiliates and partners"}
        selectOption={() => {
          onChange({ isConsented: !customerProfile?.isConsented })
        }}
      />
    </section>
  )
}