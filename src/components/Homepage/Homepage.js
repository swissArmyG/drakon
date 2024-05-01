import { useRef, useState } from 'react'
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageRequestAppt,
  HomepageContact
} from '.'
import logoPath from '../../img/logo/logo_with_text.png'
import { SideNavigation } from '../Buttons'
import { Notification } from '../Assorted'

export const Homepage = () => {
  const [ notification, setNotification ] = useState({
    type: '',
    message: '',
  })

  const backToTopRef = useRef(null)
  const storyRef = useRef(null)
  const requestApptRef = useRef(null)
  const contactRef = useRef(null)

  return (
    <section className="Homepage --container --background" ref={backToTopRef}>
      <header className="--nav-bar">
        <img
          src={`${logoPath}`}
          className="logo"
          alt="Peace of Mind Spine.com logo, with a Vitruvian man in front of the beach at sunrise"
        />
        <HomepageNav ref={{
          storyRef,
          requestApptRef,
          contactRef
        }}/>
      </header>
      <SideNavigation ref={backToTopRef} />
      <HomepageTopics />
      <div className="--content-container">
        <HomepageStory ref={storyRef} />
        <HomepageRequestAppt ref={requestApptRef} 
          notify={(notification) => setNotification(notification)} />
        <HomepageContact ref={contactRef} />
      </div>

      <Notification 
        type={notification.type} 
        message={notification.message} 
      /> 
    </section>
  )
}