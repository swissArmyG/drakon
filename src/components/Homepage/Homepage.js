import { useRef } from 'react'
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageRequestAppt,
  HomepageContact
} from '.'
import logoPath from '../../img/logo/logo_with_text.png'
import { SideNavigation } from '../Buttons'

export const Homepage = () => {
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
        <HomepageRequestAppt ref={requestApptRef} />
        <HomepageContact ref={contactRef} />
      </div>
    </section>
  )
}