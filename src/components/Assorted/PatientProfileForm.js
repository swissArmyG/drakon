import React from 'react'
export const PatientProfileForm = ({ patientProfile, onChange }) => {
  return <section className="PatientProfileForm">
    <p>Please <em>Login</em> to automatically fill out details or <em>Register</em> to save time at the next login</p>

    <div className="row">
      <div className="--input-container">
        <p><em>Firstname</em></p>
        <input type="text"
          value={patientProfile.firstname || ""}
          onChange={(e) => {
            e.preventDefault()
            onChange({ firstname: e.target.value })
          }} 
        />
      </div>
      <div className="--input-container">
        <p><em>Lastname</em></p>
        <input type="text"
          value={patientProfile.lastname || ""}
          onChange={(e) => {
            e.preventDefault()
            onChange({ lastname: e.target.value })
          }} 
        />
      </div>
    </div>

    <div className="--address-input-container">
      <p><em>Address</em><span>Optional</span></p>
      <input type="text"
        value={patientProfile.address || ""}
        onChange={(e) => {
          e.preventDefault()
          onChange({ address: e.target.value })
        }} 
      />
    </div>

    <div className="row">
      <div className="--input-container">
        <p><em>Email</em></p>
        <input type="text"
          value={patientProfile.email || ""}
          onChange={(e) => {
            e.preventDefault()
            onChange({ email: e.target.value })
          }} 
        />
      </div>
      <div className="--input-container">
        <p><em>Phone Number</em><span>Number only</span></p>
        <input type="text"
          value={patientProfile.phoneNumber || ""}
          onChange={(e) => {
            e.preventDefault()
            onChange({ phoneNumber: e.target.value })
          }} 
        />
      </div>

    </div>
  </section>
}