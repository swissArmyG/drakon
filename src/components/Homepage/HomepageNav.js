/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'

export const HomepageNav = forwardRef((_, refs) => {
  const {  
    scrollToTopRef,
    aboutRef,
    servicesRef,
    faqRef,
    contactRef
  } = refs
  
  const scrollConfig = { behavior: "smooth" }

  const navOptions = {
    home: {
      onClick: () => scrollToTopRef.current.scrollIntoView(scrollConfig),
      linkTo: '',
      title: 'HOME'
    },
    about: {
      onClick: () => aboutRef.current.scrollIntoView(scrollConfig),
      linkTo: `#about`,
      title: 'ABOUT'
    },
    services: {
      onClick: () => servicesRef.current.scrollIntoView(scrollConfig),
      linkTo: '#services',
      title: 'SERVICES'
    },
    faq: {
      onClick: () => faqRef.current.scrollIntoView(scrollConfig),
      linkTo: '#FAQ',
      title: 'FAQ'
    },
    contact: {
      onClick: () => contactRef.current.scrollIntoView(scrollConfig),
      linkTo: '#contact',
      title: 'CONTACT'
    }
  }

  return (
    <section className="HomepageNav">
      <div className="--nav-options">
        {
          Object.keys(navOptions).map((op, idx) => {
            const title = navOptions[op].title

            return <React.Fragment key={idx}>
              <Link
                to={`${navOptions[op]?.linkTo}`}
                onClick={navOptions[op].onClick}>
                <h4 className={`--nav-option --button ${op}`}>
                  {title}
                </h4>
              </Link>
            </React.Fragment>
          })
        }
      </div>
    </section>
  )
})