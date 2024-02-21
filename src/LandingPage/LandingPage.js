import fullLogoImagePath from '../img/logo/full.svg'
import { LandingPageNav } from './LandingPageNav.js'
import { LandingPageMenu } from './LandingPageMenu.js'
import { LandingPageEducation } from './LandingPageEducation'

export const LandingPage = () => {
  return (
    <section className="LandingPage --container">
      <div className="LandingPage --content-container">
        <div className="LandingPage --background-img" />
        <header className="LandingPage --nav-bar">
          <img 
            className="--logo-img"
            src={`${fullLogoImagePath}`}
            alt="Peace of Mind Spine.com logo, the left side of the logo resembles a stylish representation of a spinal column, and to the right, a partial butterfly wing."
          />
          <LandingPageNav />
        </header>
        <LandingPageMenu />
        <LandingPageEducation />
      </div>  
    </section>
  )
}