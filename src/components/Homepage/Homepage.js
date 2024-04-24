import { useRef } from 'react'
import {
  HomepageNav,
  HomepageMenu,
  HomepageEducation,
  HomepagePricing,
  HomepageStory
} from '.'
import fullLogoImagePath from '../../img/logo/full.svg'
import { SideButton } from '../Buttons'

export const Homepage = () => {
  const backToTopRef = useRef(null)
  const educationRef = useRef(null)
  const pricingRef = useRef(null)
  const storyRef = useRef(null)

  return (
    <section className="Homepage --container --background" ref={backToTopRef}>
      <header className="Homepage --nav-bar">
        <img
          className="Homepage --logo-img"
          src={`${fullLogoImagePath}`}
          alt="Peace of Mind Spine.com logo, the left side of the logo resembles a stylish representation of a spinal column, and to the right, a partial butterfly wing."
        />
        <HomepageNav />
      </header>
      <SideButton ref={backToTopRef} />
      <HomepageMenu ref={{
          educationRef,
          pricingRef,
          storyRef
        }}/>

      <div className="Homepage --content-container">
        <HomepageEducation ref={educationRef} />
        <HomepagePricing ref={pricingRef} />
        <HomepageStory ref={storyRef} />
      </div>
    </section>
  )
}