/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Login, Logout } from '.'
import { AuthContext, PatientContext } from '../../contexts'
import { readPatientByUserId } from '../../api/patients'

export const HomepageNav = forwardRef((props, refs) => {
  const { storyRef, consultationRef, contactRef } = refs
  const { userData } = useContext(AuthContext)
  const { 
    patientProfile, 
    setOriginalPatientProfile, 
    setPatientProfile 
  } = useContext(PatientContext)
  const [ isLoginModal, toggleLoginModal ] = useState(false)
  const [ isLogoutModal, toggleLogoutModal ] = useState(false)
  const scrollConfig = { behavior: "smooth" }

  const readPatient = async () => {
    try {
      const patient = await readPatientByUserId(userData?.id)
      const data = { ...patient, phoneNumber: patient.phone_number }
      
      setOriginalPatientProfile(data)
      setPatientProfile(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userData && !patientProfile) {
      readPatient()
    }
  }, [userData])

  const handleLogoutModal = () => {
    toggleLogoutModal(true)
    props.handleOverlappingModals()
  }

  const handleLoginModal = () => {
    toggleLoginModal(true)
    props.handleOverlappingModals()
  }

  const navOptions = {
    login: {
      onClick: () => userData ? handleLogoutModal() : handleLoginModal(),
      linkTo: '#login',
      text: (userData && patientProfile) ? `Hi, ${patientProfile.firstname}` : 'LOGIN'
    },
    story: {
      onClick: () => storyRef.current.scrollIntoView(scrollConfig),
      linkTo: '#story',
      text: 'OUR STORY'
    },
    consultation: {
      onClick: () => consultationRef.current.scrollIntoView(scrollConfig),
      linkTo: '#consultation',
      text: 'REQUEST CONSULTATION'
    },
    contact: {
      onClick: () => contactRef.current.scrollIntoView(scrollConfig),
      linkTo: '#contact',
      text: 'CONTACT'
    }
  }

  return (
    <section className="HomepageNav">
      <div className="--nav-options">
        {
          Object.keys(navOptions).map((op, idx) => {
            const isFocused = op === 'login' && (isLoginModal ? '--focused' : '')

            return <React.Fragment key={idx}>
              <Link
                key={idx}
                to={`${navOptions[op].linkTo}`}
                onClick={navOptions[op].onClick}>
                <h4 className={`--nav-option --button ${isFocused}`}>
                  {navOptions[op].text}
                </h4>
              </Link>

              {(op === 'login' && isLoginModal) && 
                <Login
                  isOpen={isLoginModal}
                  toggleOpen={toggleLoginModal}
                />
              }
              {(op === 'login' && isLogoutModal) && 
                <Logout
                  isOpen={isLogoutModal}
                  toggleOpen={toggleLogoutModal}
                />
              }

            </React.Fragment>
          })
        }
      </div>
      <p className="--nav-info">
        To empower individuals with unparalleled access to expert medical opinions, fostering confidence and informed decision-making in their healthcare journey.
      </p>
    </section>
  )
})