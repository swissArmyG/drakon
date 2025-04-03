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
import { Image } from '../Assorted';

export const Homepage = () => {
  const [ topic, setTopic ] = useState(undefined)

  // const [ isLoginModal, toggleLoginModal ] = useState(false)
  // const [ isLogoutModal, toggleLogoutModal ] = useState(false)

  const { scrollToTopRef } = useContext(CustomerContext)
  
  const aboutRef = useRef()
  const servicesRef = useRef()
  const contactRef = useRef()

  const refs = {
    scrollToTopRef,
    aboutRef,
    servicesRef,
    contactRef
  }

  return (
    <section 
      className={`Homepage --container --background`} 
      ref={scrollToTopRef}>
      <header className="flex row justify-between">
        <div className="--left-column">
          <Image size="sm"/>
        </div>
        <div className="--right-column">
          <HomepageNav ref={refs} />
        </div>
      </header>

      <div className="flex column justify-center align-center">
        <p className="-blurb">{intro}</p>
        <Image size="l" />
      </div>
      
      <SideNavigation ref={scrollToTopRef} />
      <div className="--content-container">
        <HomepageStory ref={aboutRef} />
        <HomepageConsultation ref={servicesRef} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}