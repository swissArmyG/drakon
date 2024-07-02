import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Login, Logout } from '.'
import { AuthContext } from '../../contexts'
import { authenticate } from '../../api/sessions'

export const HomepageNav = forwardRef((_props, refs) => {
  const { storyRef, requestApptRef, contactRef } = refs

  const { userData } = useContext(AuthContext)
  
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)
  const [ isLoginModal, toggleLoginModal ] = useState(false)
  const [ isLogoutModal, toggleLogoutModal ] = useState(false)
  
  const scrollConfig = { behavior: "smooth" }

  const authenticateCallback = async() => {
    try {
      const { authenticated } = await authenticate()
      setIsAuthenticated(authenticated)
    } catch (err) {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (userData?.email && userData?.id) {
      authenticateCallback()
    } else {
      setIsAuthenticated(false)
    }
  }, [userData])

  const isLoggingIn = userData?.email !== '' && !isAuthenticated

  const handleLogoutModal = () => {
    toggleLogoutModal(isAuthenticated ? true : false)
  }

  const handleLoginModal = () => {
    toggleLoginModal(isAuthenticated ? false : true)
  }

  const navOptions = {
    login: {
      onClick: () => isLoggingIn ? handleLoginModal() : handleLogoutModal(),
      linkTo: '#login',
      text: isLoggingIn ? 'LOGIN' : `Hi, ${userData?.email}`
    },
    story: {
      onClick: () => storyRef.current.scrollIntoView(scrollConfig),
      linkTo: '#story',
      text: 'OUR STORY'
    },
    requestAppt: {
      onClick: () => requestApptRef.current.scrollIntoView(scrollConfig),
      linkTo: '#requestAppt',
      text: 'REQUEST APPOINTMENT'
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

              { 
                op === 'login' && (
                !isAuthenticated
                  ? <Login 
                      isOpen={isLoginModal} 
                      toggleOpen={toggleLoginModal}
                    /> 
                  : <Logout
                      isOpen={isLogoutModal}
                      toggleOpen={toggleLogoutModal}
                    /> 
                )
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