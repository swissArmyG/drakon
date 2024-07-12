import { useContext, useRef, useState } from 'react'
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageRequestAppt,
  HomepageContact
} from '.'
import logoPath from '../../img/logo/logo_with_text.png'
import { SideNavigation } from '../Buttons'
import { ThemeToggle } from '../Assorted'
import { PatientContext } from '../../contexts'

export const Homepage = () => {
  const [ theme, setTheme ] = useState('DEEP_OCEAN')
  const { scrollToTopRef } = useContext(PatientContext)
  
  const storyRef = useRef()
  const consultationRef = useRef()
  const contactRef = useRef()

  return (
    <section className={`Homepage --container --background --${theme}`} ref={scrollToTopRef}>
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
        />
      </header>
      
      <SideNavigation ref={scrollToTopRef} />
      <HomepageTopics />

      <div className="--content-container">
        <HomepageStory ref={storyRef} />
        <HomepageRequestAppt ref={consultationRef} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}