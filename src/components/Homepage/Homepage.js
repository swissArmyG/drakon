import { useRef } from 'react'
import {
  HomepageNav,
  HomepageTopics,
  HomepageStory,
  HomepageRequestAppt,
  HomepageContact
} from '.'
import logoPath from '../../img/logo/icon.svg'
import logoBars from '../../img/shapes/logo_bars.svg'
import { SideNavigation } from '../Buttons'

export const Homepage = () => {
  const backToTopRef = useRef(null)
  const storyRef = useRef(null)
  const requestApptRef = useRef(null)
  const contactRef = useRef(null)

  return (
    <section className="Homepage --container --background" ref={backToTopRef}>
      <header className="--nav-bar">
        <div className="--logo-container">
          <img
            className="logo-bars"
            src={`${logoBars}`}
            alt="Logo outline fades out"
          />
          <img
            src={`${logoPath}`}
            className="logo"
            alt="Peace of Mind Spine.com logo, resembling a Vitruvian man in front of the beach at sunrise"
          />
          <p className="--logo-text">PEACEOFMIND<em>SPINE</em>.COM</p>
        </div>
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