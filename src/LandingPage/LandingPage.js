import { useRef } from 'react'
import {
  LandingPageNav,
  LandingPageMenu,
  LandingPageEducation,
  LandingPagePricing,
  LandingPageStory
} from '.'
import fullLogoImagePath from '../img/logo/full.svg'

export const LandingPage = () => {
  const educationRef = useRef(null)
  const pricingRef = useRef(null)
  const storyRef = useRef(null)

  return (
    <section className="LandingPage --container --background">
      <header className="LandingPage --nav-bar">
        <img
          className="LandingPage --logo-img"
          src={`${fullLogoImagePath}`}
          alt="Peace of Mind Spine.com logo, the left side of the logo resembles a stylish representation of a spinal column, and to the right, a partial butterfly wing."
        />
        <LandingPageNav />
      </header>

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