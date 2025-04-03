import { useContext, useRef, useState } from 'react'
import LazyLoad from 'react-lazy-load';
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageConsultation,
  HomepageContact,
} from '.'
import logoPath from '../../img/logo/logo_with_text.png'
import { SideNavigation } from '../Buttons'
import { CustomerContext } from '../../contexts'
import { intro } from '../../copies/drakon-home';

export const Homepage = () => {
  const [ topic, setTopic ] = useState(undefined)

  const [ isLoginModal, toggleLoginModal ] = useState(false)
  const [ isLogoutModal, toggleLogoutModal ] = useState(false)

  const { scrollToTopRef } = useContext(CustomerContext)
  
  const aboutRef = useRef()
  const servicesRef = useRef()
  const contactRef = useRef()

  const refs = {
    aboutRef,
    servicesRef,
    contactRef
  }

  return (
    <section 
      className={`Homepage --container --background`} 
      ref={scrollToTopRef}>
      <header className="--nav-bar">
        <div className="--left-column">
          <LazyLoad>
            <img
              src={`${logoPath}`}
              className="logo"
              alt="Peace of Mind Spine.com logo, with a Vitruvian man in front of the beach at sunrise"
            />
          </LazyLoad>
          <p className="-blurb">{intro}</p>
        </div>
        <div className="--right-column">
          <HomepageNav
            ref={refs}
            isLoginModal={isLoginModal}
            isLogoutModal={isLogoutModal}
            toggleLoginModal={toggleLoginModal}
            toggleLogoutModal={toggleLogoutModal}
          />
        </div>
      </header>
      
      <SideNavigation ref={scrollToTopRef} />
      <div className="--content-container">
        <HomepageStory ref={aboutRef} />
        <HomepageConsultation ref={servicesRef} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}