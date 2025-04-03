/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'

export const HomepageNav = forwardRef((_, refs) => {
  const {  
    aboutRef,
    servicesRef,
    contactRef
  } = refs
  
  const scrollConfig = { behavior: "smooth" }

  const navOptions = {
    home: {
      // onClick: () => "",
      linkTo: '#home',
      text: 'HOME'
    },
    about: {
      onClick: () => aboutRef.current.scrollIntoView(scrollConfig),
      linkTo: `#about`,
      text: 'ABOUT'
    },
    services: {
      onClick: () => servicesRef.current.scrollIntoView(scrollConfig),
      linkTo: '#servies',
      text: 'SERVICES'
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
            const text = navOptions[op].text

            return <React.Fragment key={idx}>
              <Link
                to={`${navOptions[op]?.linkTo}`}
                onClick={navOptions[op].onClick}>
                <h4 className={`--nav-option --button ${op}`}>
                  {text}
                </h4>
              </Link>
            </React.Fragment>
          })
        }
      </div>
    </section>
  )
})