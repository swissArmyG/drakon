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

  const scrollToSection = (currentRef) => {
    if (currentRef?.current) {
      const top = currentRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 50, ...scrollConfig })
    }
  }

  const navOptions = {
    home: {
      onClick: () => scrollToSection(scrollToTopRef),
      linkTo: '',
      title: 'HOME'
    },
    about: {
      onClick: () => scrollToSection(aboutRef),
      linkTo: `#about`,
      title: 'ABOUT'
    },
    services: {
      onClick: () => scrollToSection(servicesRef),
      linkTo: '#services',
      title: 'SERVICES'
    },
    faq: {
      onClick: () => scrollToSection(faqRef),
      linkTo: '#FAQ',
      title: 'FAQ'
    },
    contact: {
      onClick: () => scrollToSection(contactRef),
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