/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Login, Logout } from '.'
import { AuthContext, CustomerContext } from '../../contexts'
import { readCustomerByUserId } from '../../api/customers'

export const HomepageNav = forwardRef((props, refs) => {
  const {
    closeOverlappingModal,
    isLoginModal,
    isLogoutModal,
    toggleLoginModal,
    toggleLogoutModal
  } = props
  const { storyRef, consultationRef, contactRef } = refs
  const { userData } = useContext(AuthContext)
  const { 
    customerProfile, 
    setOriginalCustomerProfile, 
    setCustomerProfile 
  } = useContext(CustomerContext)
 
  const scrollConfig = { behavior: "smooth" }

  const readCustomer = async () => {
    try {
      const customer = await readCustomerByUserId(userData?.id)
      const data = { ...customer, phoneNumber: customer.phone_number }
      
      setOriginalCustomerProfile(data)
      setCustomerProfile(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (userData && !customerProfile) {
      readCustomer()
    }
  }, [userData])

  const openLogoutModal = () => {
    toggleLogoutModal(true)
    closeOverlappingModal()
  }

  const openLoginModal = () => {
    toggleLoginModal(true)
    closeOverlappingModal()
  }

  const navOptions = {
    login: {
      onClick: () => userData ? openLogoutModal() : openLoginModal(),
      linkTo: '#login',
      text: (userData && customerProfile) ? `Hi, ${customerProfile.firstname}` : 'LOGIN'
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
            const isFocused = (op === 'login' && isLoginModal) ? '--focused' : ''

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