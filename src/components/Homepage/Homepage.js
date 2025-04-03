import { useContext, useRef } from 'react'
import {
  HomepageNav,
  HomepageServices,
  HomepageAbout,
  HomepageFAQ,
  HomepageContact,
} from '.'
import headerLogo from '../../img/logo/dcg_toplogo_v2.png'
import mainLogo from '../../img/logo/drakon-logo-full-color-rgb-300px72ppi.png'
import { SideNavigation } from '../Buttons'
import { CustomerContext } from '../../contexts'
import { intro } from '../../copies/drakon-home';
import { Image } from '../Assorted';

export const Homepage = () => {
  const { scrollToTopRef } = useContext(CustomerContext)
  
  const aboutRef = useRef()
  const servicesRef = useRef()
  const faqRef = useRef()
  const contactRef = useRef()

  const refs = {
    scrollToTopRef,
    aboutRef,
    servicesRef,
    faqRef,
    contactRef
  }

  return (
    <section 
      className={`Homepage --container --background`} 
      ref={scrollToTopRef}>

      <header className="sticky flex row justify-between">
        <div className="left-column">
          <Image size="sm" logoPath={headerLogo} position="left" />
        </div>
        <div className="right-column">
          <HomepageNav ref={refs} />
        </div>
      </header>

      <div className="section-container flex column justify-center align-center">
        <p className="-blurb">{intro}</p>
        <Image size="l" logoPath={mainLogo} />
      </div>
      
      <SideNavigation ref={scrollToTopRef} />
      <div className="--content-container">
        <HomepageAbout ref={aboutRef} />
        <HomepageServices ref={servicesRef} />
        <HomepageFAQ ref={faqRef} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}