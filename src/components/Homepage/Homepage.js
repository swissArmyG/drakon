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
import {  
  NotificationContext, 
  ThemeToggle, 
} from '../Assorted'

export const Homepage = () => {
  const { setNotification } = useContext(NotificationContext)

  const [ theme, setTheme ] = useState('DEEP_OCEAN')
  const [ userData, setUserData ] = useState({})

  const backToTopRef = useRef(null)
  const storyRef = useRef(null)
  const requestApptRef = useRef(null)
  const contactRef = useRef(null)

  const notify = (notification) => {
    setNotification(notification)
  }

  return (
    <section className={`Homepage --container --background --${theme}`} ref={backToTopRef}>
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
            requestApptRef,
            contactRef
          }}
          notify={notify}
          setUserData={setUserData}
        />
      </header>
      
      <SideNavigation ref={backToTopRef} />
      <HomepageTopics />

      <div className="--content-container">
        <HomepageStory ref={storyRef} />
        <HomepageRequestAppt ref={requestApptRef} notify={notify} userData={userData} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}