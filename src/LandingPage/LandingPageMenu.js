import { 
  FadedButtonEducation,
  FadedButtonPricing,
  FadedButtonOurStory
} from '../img/buttons'
import { Link } from 'react-router-dom'

export const LandingPageMenu = () => {
  return (
    <section className="LandingPageMenu --container">
      <nav className="LandingPageMenu --menu-options">
        <Link to="#education">
          <FadedButtonEducation />
        </Link>

        <Link to="#pricing">
          <FadedButtonPricing />
        </Link>

        <Link to="#story">
          <FadedButtonOurStory />
        </Link>
      </nav>
    </section>
  )
}