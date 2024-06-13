import React, { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Login } from '.'

export const HomepageNav = forwardRef((props, refs) => {
  const { storyRef, requestApptRef, contactRef } = refs
  const [ isLoginModal, toggleLoginModal ] = useState(false)

  const scrollConfig = { behavior: "smooth" }

  const navOptions = {
    login: {
      onClick: () => !props.isLoggedIn && toggleLoginModal(true),
      linkTo: '#login',
      text: !props.isLoggedIn ? 'LOGIN' : `Hi, [ USER NAME ]`
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
          Object.keys(navOptions).map((op, index) => {
            const isFocused = op === 'login' && isLoginModal ? '--focused' : ''

            return <React.Fragment>
              <Link 
                key={index} 
                to={`${navOptions[op].linkTo}`}
                onClick={navOptions[op].onClick}>
                <h4 className={`--nav-option --button ${isFocused}`}>
                  {navOptions[op].text}
                </h4>
              </Link>
              {
                op === 'login' && <Login 
                  isOpen={isLoginModal} 
                  toggleOpen={toggleLoginModal}
                  notify={props.notify}
                  setUserData={props.setUserData}
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