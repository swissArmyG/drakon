import { useRef } from 'react'
import {
  LandingPageNav,
  LandingPageMenu,
  LandingPageEducation,
  LandingPagePricing,
  LandingPageStory
} from '.'
import fullLogoImagePath from '../../img/logo/full.svg'
import { SideButton } from '../Buttons'

export const LandingPage = () => {
  const backToTopRef = useRef(null)
  const educationRef = useRef(null)
  const pricingRef = useRef(null)
  const storyRef = useRef(null)

  return (
    <section className="LandingPage --container --background" ref={backToTopRef}>
      <header className="LandingPage --nav-bar">
        <img
          className="LandingPage --logo-img"
          src={`${fullLogoImagePath}`}
          alt="Peace of Mind Spine.com logo, the left side of the logo resembles a stylish representation of a spinal column, and to the right, a partial butterfly wing."
        />
        <LandingPageNav />
      </header>
      <SideButton ref={backToTopRef} />
      <LandingPageMenu ref={{
          educationRef,
          pricingRef,
          storyRef
        }}/>

      <div className="LandingPage --content-container">
        <LandingPageEducation ref={educationRef} />
        <LandingPagePricing ref={pricingRef} />
        <LandingPageStory ref={storyRef} />
      </div>
    </section>
  )
}