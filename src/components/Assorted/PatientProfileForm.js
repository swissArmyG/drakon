import React from 'react'

export const PatientProfileForm = ({ patientProfile, onChange }) => {
  return ( 
    <section className="PatientProfileForm">
      <p>Please <em>Login</em> to automatically fill out details or <em>Register</em> to save time at the next login</p>

      <div className="row">
        <div className="--input-container">
          <p><em>Patient's Full Name</em></p>
          <input type="text"
            placeholder="Firstname"
            value={patientProfile.firstname || ""}
            onChange={(e) => {
              e.preventDefault()
              onChange({ firstname: e.target.value })
            }} 
          />
        </div>
        <div className="--input-container">
          <p style={{ visibility: 'hidden'}}><em>Lastname</em></p>
          {/* Keep it here to preserve block styling and possible future change */}
          <input type="text"
            placeholder="Lastname"
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
          // placeholder="Optional"
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
            placeholder="Please use a valid email"
            value={patientProfile.email || ""}
            onChange={(e) => {
              e.preventDefault()
              onChange({ email: e.target.value })
            }} 
          />
        </div>
        <div className="--input-container">
          <p><em>Phone</em><span>Number Only</span></p>
          <input type="number"
            placeholder="No dash (-) or dot (.) required"
            value={patientProfile.phoneNumber || ""}
            onChange={(e) => {
              e.preventDefault()
              onChange({ phoneNumber: e.target.value })
            }} 
          />
        </div>

      </div>
    </section>
  )
}