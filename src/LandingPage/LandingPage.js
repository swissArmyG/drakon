import fullLogoImagePath from '../img/logo/full.svg'
import { 
  LandingPageNav, 
  LandingPageMenu, 
  LandingPageEducation 
} from '.'

export const LandingPage = () => {
  return (
    <section className="LandingPage --container">
      <div className="--content-container">
        <div className="--background-img" />
        <header className="--nav-bar">
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