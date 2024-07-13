import { useContext, useRef, useState } from 'react'
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageConsultation,
  HomepageContact
} from '.'
import logoPath from '../../img/logo/logo_with_text.png'
import { SideNavigation } from '../Buttons'
import { ThemeToggle } from '../Assorted'
import { CustomerContext } from '../../contexts'

export const Homepage = () => {
  const [ theme, setTheme ] = useState('DEEP_OCEAN')
  const [ topic, setTopic ] = useState(undefined)

  const [ isLoginModal, toggleLoginModal ] = useState(false)
  const [ isLogoutModal, toggleLogoutModal ] = useState(false)

  const { scrollToTopRef } = useContext(CustomerContext)
  
  const storyRef = useRef()
  const consultationRef = useRef()
  const contactRef = useRef()

  const closeOverlappingModals = (modalToClose) => {
    if (modalToClose === 'topic') {
      setTopic(undefined)
    } else if (modalToClose === 'authentication') {
      toggleLoginModal(false)
      toggleLogoutModal(false)
    }
  }

  return (
    <section 
      className={`Homepage --container --background --${theme}`} 
      ref={scrollToTopRef}>
      <header className="--nav-bar">
        <div>
          <img
            src={`${logoPath}`}
            className="logo"
            alt="Peace of Mind Spine.com logo, with a Vitruvian man in front of the beach at sunrise"
          />
          <ThemeToggle onToggle={setTheme} theme={theme}/>
        </div>
        <HomepageNav
          ref={{
            storyRef,
            consultationRef,
            contactRef
          }}
          isLoginModal={isLoginModal}
          isLogoutModal={isLogoutModal}
          toggleLoginModal={toggleLoginModal}
          toggleLogoutModal={toggleLogoutModal}
          closeOverlappingModal={() => closeOverlappingModals('topic')}
        />
      </header>
      
      <SideNavigation ref={scrollToTopRef} />
      <HomepageTopics 
        topic={topic} 
        setTopic={setTopic} 
        closeOverlappingModal={() => closeOverlappingModals('authentication')} 
      />

      <div className="--content-container">
        <HomepageStory ref={storyRef} />
        <HomepageConsultation ref={consultationRef} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}