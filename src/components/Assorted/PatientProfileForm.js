import React from 'react'

export const PatientProfileForm = ({ patientProfile, onChange }) => {
  return ( 
    <section className="PatientProfileForm">
      <p>Please <em>Login</em> to automatically fill out details or <em>Register</em> to save time at the next login</p>

      <div className="row">
        <div className="--input-container">
          <p><em>Patient's Full Name</em></p>
          <input type="text"
            id="firstname"
            placeholder="Firstname"
            value={patientProfile.firstname || ""}
            onChange={({ target: { value }}) => onChange({ firstname: value })}
          />
        </div>
        <div className="--input-container">
          <p style={{ visibility: 'hidden'}}><em>Lastname</em></p>
          {/* Keep it here to preserve block styling and possible future change */}
          <input type="text"
            id="lastname"
            placeholder="Lastname"
            value={patientProfile.lastname || ""}
            onChange={({ target: { value }}) => onChange({ lastname: value })}
          />
        </div>
      </div>

      <div className="--address-input-container">
        <p><em>Address</em><span>Optional</span></p>
        <input type="text"
          id="address"
          // placeholder="Optional"
          value={patientProfile.address || ""}
          onChange={({ target: { value }}) => onChange({ address: value })}
        />
      </div>

      <div className="row">
        <div className="--input-container">
          <p><em>Email</em></p>
          <input type="text"
            id="email"
            autoComplete="on"
            placeholder="Please use a valid email"
            value={patientProfile.email || ""}
            onChange={({ target: { value }}) => onChange({ email: value })}
          />
        </div>
        <div className="--input-container">
          <p><em>Phone</em><span>Number Only</span></p>
          <input type="number"
            id="phone"
            placeholder="No dash (-) or dot (.) required"
            value={patientProfile.phoneNumber || ""}
            onChange={({ target: { value }}) => onChange({ phoneNumber: value })} 
          />
        </div>

      </div>
    </section>
  )
}